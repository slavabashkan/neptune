import { FoldersTreeItem } from '../models/FoldersTreeItem';
import { getDbInstance, fetchLastId } from '../db';
import { Folder, LibraryRoot } from '../models/db';
import dependenciesBridge from '../dependenciesBridge';

const { fs, path } = dependenciesBridge;

/**
 * Media library actions
 */

/** Scan library folder and reload folders and media information stored in db */
export const reload = async (): Promise<void> => {
  const foldersToInsert = await readAllFoldersFromDiskInSequentialOrder();
  await rewriteFoldersInDb(foldersToInsert);
};

async function readAllFoldersFromDiskInSequentialOrder(): Promise<Folder[]> {
  const roots = await fetchLibraryRoots();
  let foldersLastId = await fetchLastId('Folders');

  const foldersToInsert: Folder[] = [];

  for (const root of roots) {
    if (!fs.existsSync(root.path)) {
      // eslint-disable-next-line no-console
      console.warn(`Root path '${root.path}' not found. Entry skipped.`);
      continue;
    }

    const rootFolder: Folder = {
      id: ++foldersLastId,
      name: path.basename(root.path),
      date: null,
      parentId: null,
      libraryRootId: root.id
    };
    foldersToInsert.push(rootFolder);

    // eslint-disable-next-line no-await-in-loop
    await readSubfoldersFromDiskToArray(rootFolder, root.path, foldersToInsert);
    foldersLastId = foldersToInsert[foldersToInsert.length - 1].id;

    // todo: fill dates
  }

  return foldersToInsert;
}

async function readSubfoldersFromDiskToArray(parentFolder: Folder, parentFolderPath: string, targetArray: Folder[]): Promise<void> {
  let lastId = parentFolder.id;

  const foldersPaths = (await fs.promises.readdir(parentFolderPath, { withFileTypes: true }))
    .filter(d => d.isDirectory())
    .map(d => path.join(parentFolderPath, d.name));

  for (const folderPath of foldersPaths) {
    const folder: Folder = {
      id: ++lastId,
      name: path.basename(folderPath),
      date: null,
      parentId: parentFolder.id,
      libraryRootId: null
    };
    targetArray.push(folder);

    // eslint-disable-next-line no-await-in-loop
    await readSubfoldersFromDiskToArray(folder, folderPath, targetArray);
    lastId = targetArray[targetArray.length - 1].id;
  }
}

async function rewriteFoldersInDb(foldersToInsertInSequentalOrder: Folder[]): Promise<void> {
  if (!foldersToInsertInSequentalOrder.length) {
    return;
  }

  const db = await getDbInstance();

  try {
    await db.run('begin');

    const deleteQuery = 'delete from Folders';
    await db.run(deleteQuery);

    const fieldNames = Object.keys(foldersToInsertInSequentalOrder[0]);
    const insertQuery = `insert into Folders (${fieldNames.join(', ')}) values (${fieldNames.map(f => `$${f}`).join(', ')})`;

    for (const folder of foldersToInsertInSequentalOrder) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const params: any = {};
      for (const field of fieldNames) {
        params[`$${field}`] = (folder as any)[field];
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */

      // eslint-disable-next-line no-await-in-loop
      await db.run(insertQuery, params);
    }

    await db.run('commit');
  } catch (error) {
    await db.run('rollback');
    throw error;
  }
}

/** Fetch folders tree from db */
export const fetchFoldersTree = async (): Promise<FoldersTreeItem[]> => {
  const db = await getDbInstance();

  const roots = await fetchLibraryRoots();

  const getFoldersQuery = 'select * from Folders';
  const folders = await db.all<Folder>(getFoldersQuery);

  return roots
    .map(r => getFoldersByRootFromArray(r, folders))
    .filter(r => r != null) as FoldersTreeItem[];
};

async function fetchLibraryRoots(): Promise<LibraryRoot[]> {
  const db = await getDbInstance();
  const query = 'select * from LibraryRoots';
  return db.all<LibraryRoot>(query);
}

function getFoldersByRootFromArray(root: LibraryRoot, allFolders: Folder[]): FoldersTreeItem|null {
  const rootFolder = allFolders.find(f => f.libraryRootId === root.id && !f.parentId);

  if (!rootFolder) {
    return null;
  }

  return {
    id: rootFolder.id,
    name: rootFolder.name,
    date: rootFolder.date,
    path: root.path,
    subfolders: getSubfoldersFromArray(rootFolder, root.path, allFolders)
  };
}

function getSubfoldersFromArray(parent: Folder, parentPath: string, allFolders: Folder[]): FoldersTreeItem[] {
  return allFolders
    .filter(f => f.parentId === parent.id)
    .map(f => {
      const folderPath = path.join(parentPath, f.name);
      return {
        id: f.id,
        name: f.name,
        date: f.date,
        path: folderPath,
        subfolders: getSubfoldersFromArray(f, folderPath, allFolders)
      };
    });
}

import { FoldersTreeItem } from "../models/FoldersTreeItem";
import getDb from '../db';
import { Folder, LibraryRoot } from '../models/db';
import dependenciesBridge from '../dependenciesBridge';

const { path } = dependenciesBridge;

/**
 * Media library actions
 */

/** Scan library folder and reload folders and media information stored in db */
export const reload = async (): Promise<void>  => {
  throw new Error('Not implemented');
}

/** Fetch folders tree from db. */
export const fetchFoldersTree = async (): Promise<FoldersTreeItem[]> => {
  const db = await getDb();
  
  const getRootsQuery = 'select * from LibraryRoots';
  const roots = await db.all<LibraryRoot>(getRootsQuery);

  const getFoldersQuery = 'select * from Folders';
  const folders = await db.all<Folder>(getFoldersQuery);

  return roots
    .map(r => getFoldersByRoot(r, folders))
    .filter(r => r != null) as FoldersTreeItem[];
}

const getFoldersByRoot = (root: LibraryRoot, allFolders: Folder[]): FoldersTreeItem|null => {
  const rootFolder = allFolders.find(f => f.libraryRootId === root.id && !f.parentId);

  if (!rootFolder) {
    return null;
  }

  return {
    id: rootFolder.id,
    name: rootFolder.name,
    date: rootFolder.date,
    path: root.path,
    subfolders: getSubfolders(rootFolder, root.path, allFolders)
  };
}

const getSubfolders = (parent: Folder, parentPath: string, allFolders: Folder[]): FoldersTreeItem[] => {
  return allFolders
    .filter(f => f.parentId === parent.id)
    .map(f => {
      const folderPath = path.join(parentPath, f.name);
      return {
        id: f.id,
        name: f.name,
        date: f.date,
        path: folderPath,
        subfolders: getSubfolders(f, folderPath, allFolders)
      }
    });
}
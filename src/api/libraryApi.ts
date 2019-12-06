import { FoldersTreeItem } from "../models/FoldersTreeItem";

/**
 * Media library actions
 * */

/** Scan library folder and reload folders and media information stored in db */
export async function reload(): Promise<void>  {
  throw new Error('LibraryApi.reload() is not implemented');
}

/** Fetch folders tree from db. */
export async function fetchFoldersTree(): Promise<FoldersTreeItem[]> {
  return [
    {id: 1, name: '2017', date: '2017-12-31 00:00:00', path: '', subfolders: [
      {id: 4, name: 'Новый год!', date: '2017-12-31 00:00:00', path: '', subfolders: []},
      {id: 9, name: '--Пустая папка', date: null, path: '', subfolders: []}
    ]},
    {id: 2, name: '2019', date: '2019-01-10 18:25:00', path: '', subfolders: [
      {id: 5, name: 'Прогулка по парку', date: '2019-06-10 00:00:00', path: '', subfolders: []},
      {id: 6, name: '8 марта', date: '2019-03-08 00:00:00', path: '', subfolders: []},
      {id: 7, name: '8 марта (вечер)', date: '2019-03-08 20:00:00', path: '', subfolders: []},
      {id: 8, name: 'День рождения', date: '2019-01-10 18:25:00', path: '', subfolders: []}
    ]},
    {id: 3, name: '2018', date: null, path: '', subfolders: []},
  ];
}
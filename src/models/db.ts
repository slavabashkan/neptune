/**
 * Database objects interfaces
 */

/** Media folder information */
export interface Folder {
  id: number;
  name: string;
  date: string|null;
  parentId: number|null;
  libraryRootId: number|null;
}

/** Path to root library folder */
export interface LibraryRoot {
  id: number;
  path: string;
}

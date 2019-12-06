/** Represents folder item in Folders tree. */
export interface FoldersTreeItem {
  id: number,
  name: string,
  /** Folder date in ISO format. Equals to the earliest file or subfolder date. Denormalized. */
  date: string|null,
  /** Full path to folder on disk. */
  path: string,
  subfolders: FoldersTreeItem[]
}
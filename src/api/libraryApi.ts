/** Media library actions */
class LibraryApi {

  /** Scanning library folder and reloading folders and media information stored in db */
  reload = (): void => {
    throw new Error('LibraryApi.reload() is not implemented');
  }

}

export default new LibraryApi();
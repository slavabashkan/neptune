/** Media library actions */
class LibraryApi {

  /** Scan library folder and reload folders and media information stored in db */
  reload = async (): Promise<void> => {
    throw new Error('LibraryApi.reload() is not implemented');
  }

}

export default new LibraryApi();
/** Set of Node modules exposed to renderer process */
export interface ExtendedGlobal extends NodeJS.Global {
  dependenciesBridge: {
    __dirname: string,
    fs: typeof import ('fs'),
    isDev: typeof import ('electron-is-dev'),
    path: typeof import ('path'),
    sqlite: typeof import ('sqlite')
  }
}

export default (global as ExtendedGlobal).dependenciesBridge;
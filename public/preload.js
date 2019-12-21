function init() {

  // expose Node libraries to renderer process
  global.dependenciesBridge = {
    __dirname,
    fs: require('fs'),
    isDev: require('electron-is-dev'),
    path: require('path'),
    sqlite: require('sqlite')
  };

}

init();
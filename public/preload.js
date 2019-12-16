window.apis = {};

window.apis.ls = (params) => {
  const path = require('path');
  const fs = require('fs');
  return fs.readdirSync(path.join(__dirname, '..'));
}
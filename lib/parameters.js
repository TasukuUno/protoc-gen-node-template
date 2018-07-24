const fs = require('fs');
const path = require('path');

const builtin = {
  raw: {
    path: path.resolve(__dirname, '..', 'templates', 'raw', 'index.ejs'),
    ext: 'json',
  },
  md: {
    path: path.resolve(__dirname, '..', 'templates', 'md', 'index.ejs'),
    ext: 'md',
  },
  json_ts: {
    path: path.resolve(__dirname, '..', 'templates', 'json_ts', 'index.ejs'),
    ext: 'ts',
  },
};

builtin.default = builtin.raw;


/**
 * parse proto parameters
 * @param {string} paramString string like 'a=1,b,c=3'
 * @return {object} parsed parameter object
 */
function parse(paramString = '') {
  const params = {};
  const parts = paramString.split(',');
  for (let i = 0; i < parts.length; i++) {
    const item = parts[i];
    const sep = item.split('=');
    const [key, value] = sep;
    if (sep.length > 1) {
      params[key] = value;
    } else if (key) {
      params[key] = true;
    }
  }

  const {template, ext, ...rest} = params;
  return {
    ...rest,
    ...defineTemplate(template, ext),
  };
}

/**
 * aaa
 * @param {string} specifiedPath
 * @param {string} specifiedExt
 * @return {object} template and ext
 */
function defineTemplate(specifiedPath, specifiedExt) {
  let resultPath;
  let resultExt;

  if (specifiedPath) {
    resultPath = path.resolve(process.cwd(), specifiedPath);
    if (fs.existsSync(resultPath) && fs.statSync(resultPath).isFile()) {
      resultExt = specifiedExt || 'txt';
    } else if (builtin[specifiedPath]) {
      resultPath = builtin[specifiedPath].path;
      resultExt = builtin[specifiedPath].ext;
    } else {
      throw Error('template not found');
    }
  } else {
    resultPath = builtin.default.path;
    resultExt = builtin.default.ext;
  }

  return {
    template: resultPath,
    ext: resultExt,
  };
}

module.exports = {
  parse,
};

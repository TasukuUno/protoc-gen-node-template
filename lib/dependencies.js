const _ = require('lodash');

/**
 * build a map of dependencies
 * @param {Array} protos
 * @return {Object} { [fileName]: TypeName[] }
 */
module.exports = function(protos) {
  const fileTypeMap = buildFileTypeMap(protos);
  const dependenciesMap = {};
  _.forEach(protos, (proto) => {
    dependenciesMap[proto.name] = pickDependencies(fileTypeMap, proto);
  });

  return dependenciesMap;
};

/**
 * build a map of file names and type names defined in each of them
 * @param {Array} protos
 * @return {Object} { [fileName]: TypeName[] }
 */
function buildFileTypeMap(protos) {
  const fileTypeMap = {};
  _.forEach(protos, (proto) => {
    const {name, pb_package: pkg, messageTypeList, enumTypeList} = proto;
    const types = fileTypeMap[name] = [];
    const rootPrefix = `.${pkg}`;
    getTypeNamesInMessage(rootPrefix, messageTypeList)
      .concat(getTypeNamesInEnum(rootPrefix, enumTypeList))
      .forEach((name) => types.push(name));
  });

  return fileTypeMap;
}

/**
 * returns a type names array defined in messageTypeList
 * @param {String} prefix
 * @param {Array} messageTypeList
 * @return {Array}
 */
function getTypeNamesInMessage(prefix, messageTypeList) {
  const types = [];

  _.map(messageTypeList, (messageType) => {
    const {name, nestedTypeList, enumTypeList} = messageType;
    const typeName = `${prefix}.${name}`;
    types.push(typeName);

    getTypeNamesInMessage(typeName, nestedTypeList)
      .concat(getTypeNamesInEnum(typeName, enumTypeList))
      .forEach((name) => types.push(name));
  });

  return types;
}

/**
 * returns a type names array defined in enumTypeList
 * @param {String} prefix
 * @param {Array} enumTypeList
 * @return {Array}
 */
function getTypeNamesInEnum(prefix, enumTypeList) {
 return _.map(enumTypeList, (enumType) => {
    const {name} = enumType;
    return `${prefix}.${name}`;
  });
}

/**
 * build dependencies from a proto file
 * @param {Object} fileTypeMap
 * @param {Object} proto
 * @return {Array} collection of file name and type names
 */
function pickDependencies(fileTypeMap, proto) {
  if (_.isEmpty(proto.dependencyList)) {
    return [];
  }
  const dependencies = [];
  const typeNames = listupTypeNames(proto);
  _.forEach(proto.dependencyList, (fileName) => {
    const providedTypeNames = fileTypeMap[fileName];
    if (!providedTypeNames) {
      return;
    }

    dependencies.push({
      fileName,
      typeNames: _.filter(providedTypeNames, (name) => {
        return _.includes(typeNames, name);
      }),
    });
  });

  return dependencies;
}

/**
 * build list of typeNames in a proto file
 * @param {Object} proto
 * @return {Array} array of type names
 */
function listupTypeNames(proto) {
  const typeNames = [];
  const loop = (message) => {
    const {fieldList, nestedTypeList} = message;
    _.forEach(fieldList, (field) => {
      const {typeName} = field;
      if (typeName && !_.includes(typeNames, typeName)) {
        typeNames.push(typeName);
      }
    });
    _.forEach(nestedTypeList, loop);
  };

  _.forEach(proto.messageTypeList, loop);
  return typeNames;
}

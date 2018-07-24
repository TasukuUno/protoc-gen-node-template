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
    _.forEach(_.concat(messageTypeList, enumTypeList), (messageOrEnum) => {
      const {name} = messageOrEnum;
      types.push(`.${pkg}.${name}`);
    });
  });

  return fileTypeMap;
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

const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const ejs = require('ejs');
const {
  CodeGeneratorRequest,
  CodeGeneratorResponse,
  CodeGeneratorResponseError,
  findCommentByPath,
} = require('protoc-plugin');
const {
  FieldDescriptorProto,
} = require('google-protobuf/google/protobuf/descriptor_pb');
const {parse: parseParameter} = require('./lib/parameters');
const mapDependencies = require('./lib/dependencies');

main()
  .then(CodeGeneratorResponse())
  .catch(CodeGeneratorResponseError());

/**
 * main
 * @return {Array<{name: string, content: string}>}
 */
async function main() {
  const request = await CodeGeneratorRequest().then((r) => r.toObject());
  const parameter = parseParameter(request.parameter);
  const compilerVersion = request.compilerVersion;

  const protos = _.filter(request.protoFileList, (p) => {
    return request.fileToGenerateList.indexOf(p.name) !== -1;
  });
  const template = await prepareTemplate(parameter.template);
  const TYPE = generateConstantsMap(FieldDescriptorProto.Type);
  const LABEL = generateConstantsMap(FieldDescriptorProto.Label);
  const dependenciesMap = mapDependencies(protos);
  return _.map(protos, (proto) => {
    const name = proto.name.replace(/\.proto$/, `.${parameter.ext}`);
    return {
      name,
      content: template({
        dependencies: dependenciesMap[proto.name],
        proto,
        protos,
        parameter,
        compilerVersion,
        findCommentByPath,
        TYPE,
        LABEL,
        _,
      }),
    };
  });
}


/**
 * load .ejs file and prepare template function
 * @param {string} templatePath
 * @return {Promise<function>} ejs template function
 */
async function prepareTemplate(templatePath) {
  const template = await promisify(fs.readFile)(templatePath);

  return ejs.compile(template.toString(), {
    root: path.parse(templatePath).dir,
  });
}

/**
 * Returns a mapped object of number - type or label string
 * @param {object} object - Type or Label
 * @return {object} - { [key: number]: string }
 */
function generateConstantsMap(object) {
  const result = {};
  _.forEach(object, (number, key) => {
    const string = key.split('_')[1].toLowerCase();
    result[number] = string;
  });
  return result;
}

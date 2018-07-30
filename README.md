![image](https://user-images.githubusercontent.com/4372047/43388088-2c9cc354-9423-11e8-91cb-39863bb3c97a.png)

Protoc plugin to generate files by your own templates.

## Installation

This is a plugin for protoc. Install protobuf via [Homebrew](https://docs.brew.sh/Installation) or [chocolatey](https://chocolatey.org/packages/protoc) first.  
And you can get this via npm. 

```
npm install protoc-gen-node-template --save-dev
```

Then you should have the plugin executable in `./node_modules/.bin` .

## Use with default templates

### *.proto => *.md

```
protoc --plugin=protoc-gen-node-template=./node_modules/.bin/protoc-gen-node-template \
  --node-template_out=template=md:./PATH/TO/OUT \
  -I ./PATH/TO/PROTO/DIR ./PATH/TO/PROTO/DIR/*.proto
```

[See also](https://github.com/TasukuUno/protoc-gen-node-template/blob/b0463509e0f657b4496a4ea8affbcb58ae7f30c8/examples/basic/generate.sh#L9-L13)


### *.proto => *.ts interfaces for JSON communication

```
protoc --plugin=protoc-gen-node-template=./node_modules/.bin/protoc-gen-node-template \
  --node-template_out=template=json_ts:./PATH/TO/OUT \
  -I ./PATH/TO/PROTO/DIR ./PATH/TO/PROTO/DIR/*.proto
```

[See also](https://github.com/TasukuUno/protoc-gen-node-template/blob/b0463509e0f657b4496a4ea8affbcb58ae7f30c8/examples/basic/generate.sh#L15-L19)

## Use with your custom templates (recommended)

You can write your own templates in [ejs](https://www.npmjs.com/package/ejs) which is a well-known template engine for Node.js.  
I recommend to do this because what you define with the proto file depends on each project.

```
protoc --plugin=protoc-gen-node-template=./node_modules/.bin/protoc-gen-node-template \
  --node-template_out=template=./PATH/TO/template.ejs,ext=md:./PATH/TO/OUT \
  -I ./PATH/TO/PROTO/DIR ./PATH/TO/PROTO/DIR/*.proto
```

[See also](https://github.com/TasukuUno/protoc-gen-node-template/blob/b0463509e0f657b4496a4ea8affbcb58ae7f30c8/examples/basic/generate.sh#L21-L25)


- The ejs file under the directory of the specified template file can be implicitly included.
- You can learn more about what variables can be accessed in the template with the `raw` default template below.

```
protoc --plugin=protoc-gen-node-template=./node_modules/.bin/protoc-gen-node-template \
  --node-template_out=template=raw,yourAnyParam=abc:./PATH/TO/OUT \
  -I ./PATH/TO/PROTO/DIR ./PATH/TO/PROTO/DIR/*.proto
```

[See also](https://github.com/TasukuUno/protoc-gen-node-template/blob/b0463509e0f657b4496a4ea8affbcb58ae7f30c8/examples/basic/generate.sh#L3-L7)

## Motivation

![motivation](https://user-images.githubusercontent.com/4372047/43397171-daf7d306-943e-11e8-9d23-5de81ab5cd63.png)

- Our API server already has proto files and the other clients fetch resources via protobuf binary communication.
- Some of Web (especially browser) developers like me want to communicate via JSON for performance reasons.
- But I really want TypeScript type definition of API which is automatically generated!!

## You can check also...

Don't you like me? You can check also...

- [protoc-gen-json-ts](https://www.npmjs.com/package/protoc-gen-json-ts)
- [protoc-gen-gotemplate](https://github.com/moul/protoc-gen-gotemplate)

## Contributing

The author is new to publish npm. Please feel free to make PRs or issues! Thank you for your help! 😄

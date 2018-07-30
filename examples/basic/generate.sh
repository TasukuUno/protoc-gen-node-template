cd `dirname $0`

echo "== raw =="
mkdir -p ./dist/raw
protoc --plugin=protoc-gen-node-template=../../bin/protoc-gen-node-template \
  --node-template_out=template=raw,yourAnyParam=abc:./dist/raw \
  -I ./proto ./proto/*.proto

echo "== md =="
mkdir -p ./dist/md
protoc --plugin=protoc-gen-node-template=../../bin/protoc-gen-node-template \
  --node-template_out=template=md:./dist/md \
  -I ./proto ./proto/*.proto

echo "== json_ts =="
mkdir -p ./dist/json_ts
protoc --plugin=protoc-gen-node-template=../../bin/protoc-gen-node-template \
  --node-template_out=template=json_ts,useOptional:./dist/json_ts \
  -I ./proto ./proto/*.proto

echo "== custom template =="
mkdir -p ./dist/custom
protoc --plugin=protoc-gen-node-template=../../bin/protoc-gen-node-template \
  --node-template_out=template=./templates/custom.ejs,ext=md,something=HELLO:./dist/custom \
  -I ./proto ./proto/*.proto

# skill.proto

## SkillProto

| label | name | type | number |
| ----- | ---- | ---- | ------ |
| optional | name | string | 1 |
| optional | power | int32 | 2 |
| optional | nested | NestedProto | 3 |
| reserved | foo | | |
| reserved | bar | | |
| reserved | | | 4, 8 to 10, 14 |

### NestedEnum

| name | number |
| ---- | ---- |
| a | 0 |
| b | 1 |

### NestedProto

| label | name | type | number |
| ----- | ---- | ---- | ------ |
| optional | a | string | 1 |
| optional | b | int64 | 2 |


## InternalNestedUserProto

| label | name | type | number |
| ----- | ---- | ---- | ------ |
| optional | nestedMsg | NestedProto | 1 |
| optional | nestedEnum | NestedEnum | 2 |


## RootEnum

| name | number |
| ---- | ---- |
| a | 0 |
| b | 1 |

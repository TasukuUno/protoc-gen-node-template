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


### NestedProto

| label | name | type | number |
| ----- | ---- | ---- | ------ |
| optional | a | string | 1 |
| optional | b | int64 | 2 |



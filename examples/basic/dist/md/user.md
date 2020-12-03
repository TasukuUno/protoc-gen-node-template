# user.proto

## UserProto

| label | name | type | number |
| ----- | ---- | ---- | ------ |
| optional | id | string | 1 |
| optional | name | string | 2 |
| optional | gender | Gender | 3 |
| optional | level | int32 | 4 |
| optional | updatedAt | int64 | 5 |
| optional | isDeleted | bool | 6 |
| repeated | skills | SkillProto | 7 |

### Gender

| name | number |
| ---- | ---- |
| male | 0 |
| female | 1 |

## ExternalNestedUserProto

| label | name | type | number |
| ----- | ---- | ---- | ------ |
| optional | nestedMsg | NestedProto | 1 |
| optional | nestedEnum | NestedEnum | 2 |



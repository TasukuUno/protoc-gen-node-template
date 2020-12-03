export interface SkillProto {
  name?: string;
  power?: number;
  nested?: SkillProtoNestedProto;
}

export enum SkillProtoNestedEnum {
  a = 0,
  b = 1,
}

export interface SkillProtoNestedProto {
  a?: string;
  b?: number;
}

export interface InternalNestedUserProto {
  nestedMsg?: SkillProtoNestedProto;
  nestedEnum?: SkillProtoNestedEnum;
}

export enum RootEnum {
  a = 0,
  b = 1,
}


export interface SkillProto {
  name?: string;
  power?: number;
  nested?: SkillProtoNestedProto;
}

export interface SkillProtoNestedProto {
  a?: string;
  b?: number;
}


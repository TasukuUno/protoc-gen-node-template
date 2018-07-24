export interface SkillProto {
  name: string;
  power: number;
  nested: SkillProtoNestedProto;
}

interface SkillProtoNestedProto {
  a: string;
  b: number;
}


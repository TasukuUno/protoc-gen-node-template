import {
  SkillProto,
  NestedProto,
  NestedEnum,
} from './skill';

export interface UserProto {
  id?: string;
  name?: string;
  gender?: UserProtoGender;
  level?: number;
  updatedAt?: number;
  isDeleted?: boolean;
  skills?: SkillProto[];
}

export enum UserProtoGender {
  male = 0,
  female = 1,
}

export interface ExternalNestedUserProto {
  nestedMsg?: SkillProtoNestedProto;
  nestedEnum?: SkillProtoNestedEnum;
}


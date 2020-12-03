import {
  SkillProto,
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


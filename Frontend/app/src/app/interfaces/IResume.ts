import { IEducation } from './IEducation';
import { IExperience } from './IExperience';
import { IProject } from './IProject';
import { ISkill } from './ISkill';

export interface IResume {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  contactEmail: string;
  contactPhone: string;
  Experiences: IExperience[];
  Education: IEducation[];
  Projects: IProject[];
  Skills: ISkill[];
}

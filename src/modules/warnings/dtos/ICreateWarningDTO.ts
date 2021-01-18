import SensitiveContent from '../infra/typeorm/entities/SensitiveContent';

export default interface ICreateWarningDTO {
  description: string;
  user_id: string;
  media_id: string;
  sensitive_contents: SensitiveContent[];
}

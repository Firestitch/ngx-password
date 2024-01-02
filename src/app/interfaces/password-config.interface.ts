import { IFsPasswordStrengthConfig } from './password-strength-config.interface';

export interface IFsPasswordConfig {
  minLength?: number; // min new password length
  enableCurrentPassword?: boolean; // enables current password
  exclude?: string[]; // excludes these words for new password,
  title?: string;
  strength?: boolean;
  strengthConfig?: IFsPasswordStrengthConfig;
}

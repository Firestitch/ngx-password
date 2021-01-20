import { IFsPasswordButton } from './password-button.interface';
import { ISubmitFunc } from './password-submit-func.interface';
import { IFsPasswordConfig } from './password-config.interface';

export interface IFsPasswordDialogConfig extends IFsPasswordConfig {
  buttons?: IFsPasswordButton[];
  submit?: ISubmitFunc; // observable submit func,
  newPassword?: string;
  currentPassword?: string;
  width?: string;
}



import { IFsPasswordButton } from './fs-password-button.interface';
import { ISubmitFunc } from './fs-password-submit-func.interface';
import { IFsPasswordConfig } from './fs-password-config.interface';

export interface IFsPasswordDialogConfig extends IFsPasswordConfig {
  buttons?: IFsPasswordButton[];
  submit?: ISubmitFunc; // observable submit func,
  newPassword?,
  currentPassword?
}



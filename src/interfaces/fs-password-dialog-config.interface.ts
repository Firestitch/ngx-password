import { IFsPasswordButton } from './fs-password-button.interface';
import { IDoneFunc } from './fs-password-done-func.interface';
import { IFsPasswordConfig } from './fs-password-config.interface';

export interface IFsPasswordDialogConfig extends IFsPasswordConfig {
  buttons?: IFsPasswordButton[];
  done?: IDoneFunc; // observable done func
}



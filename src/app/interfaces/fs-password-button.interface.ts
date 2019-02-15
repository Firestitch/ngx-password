export interface IFsPasswordButton {
  label?: string;
  action?: string | Function;
  color?: string;
  type?: string;
  click?: Function;
  classList?: string[];
  classes?: { [key: string]: boolean };
}

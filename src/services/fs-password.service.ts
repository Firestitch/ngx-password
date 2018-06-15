import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

import { FsPasswordComponent } from '../components/fs-password/fs-password.component';


@Injectable()
export class FsPasswordService {

  private _defaultDialogConfig: MatDialogConfig = {
    minWidth: '400px',
    autoFocus: false,
  };

  constructor(private _dialog: MatDialog) {}

  public update(dialogConfig?: MatDialogConfig, dialogTemplate?: TemplateRef<any>): MatDialogRef<any> {
    const generatedDialogConfig = Object.assign(
      new MatDialogConfig(),
      this._defaultDialogConfig,
      dialogConfig
    );

    return this._dialog.open(dialogTemplate || FsPasswordComponent, generatedDialogConfig);
  }

}

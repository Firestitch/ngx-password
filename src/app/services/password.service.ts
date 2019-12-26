import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { FsPasswordDialogComponent } from '../components/password-dialog/password-dialog.component';
import { IFsPasswordDialogConfig } from '../interfaces/password-dialog-config.interface';
import { IFsPasswordButton } from '../interfaces/password-button.interface';


@Injectable()
export class FsPasswordService {

  private _defaultDialogConfig: MatDialogConfig;
  private _defaultButtons: IFsPasswordButton[];
  private _matRef: MatDialogRef<any, any>;

  constructor(private _dialog: MatDialog) {
    this._defaultDialogConfig = {
      autoFocus: false,
      disableClose: false,
      hasBackdrop: true
    };

    this._defaultButtons = [
      {
        label: 'Update password',
        action: 'submit',
        color: 'primary'
      },
      {
        label: 'Cancel',
        action: 'cancel',
        color: 'primary'
      }
    ]
  }

  public open(configs: IFsPasswordDialogConfig) {

    return new Observable(observer => {

      const config = this.composeConfig(configs);
      this._matRef = this._dialog.open(FsPasswordDialogComponent, config);
      const sub = this._matRef.afterClosed().subscribe(res => {
        sub.unsubscribe();
        res.action === 'submit' ? observer.next(res) : observer.error(res);
      });

      return () => {
        this._matRef.close();
        sub.unsubscribe();
      }
    });
  }

  /**
   * Generate config with default settings and default buttons
   * @param config
   * @returns MatDialogConfig
   */
  private composeConfig(config: IFsPasswordDialogConfig) {

    if (!config.buttons.length) {
      config.buttons = this._defaultButtons;
    }

    config.buttons.forEach((btn) => {
      btn.type = btn.action == 'submit' ? 'submit' : 'button';
    });

    if (!config.title) {
      config.title = 'Change Password';
    }

    return Object.assign({ data: config }, this._defaultDialogConfig );
  }
}

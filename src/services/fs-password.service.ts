import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { IFsPasswordDialogConfig, IFsPasswordButton } from '../interfaces';
import { FsPasswordDialogComponent } from '../components';


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

    return Observable.create(observer => {

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
   * @param {IFsPasswordDialogConfig} config
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

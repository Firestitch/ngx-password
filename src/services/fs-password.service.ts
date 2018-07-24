import { Injectable } from '@angular/core';
import { IFsPasswordDialogConfig, IFsPasswordButton } from '../interfaces';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FsPasswordDialogComponent } from '../components/fs-password-dialog/fs-password-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import { Observable } from '../../node_modules/rxjs';

@Injectable()
export class FsPasswordService {
  private _defaultDialogConfig: MatDialogConfig;
  private _defaultButtons: IFsPasswordButton[];
  private _matRef: MatDialogRef<any, any>;

  private _promise: Promise<any>;
  private _resolver: any;
  private _rejector: any;

  constructor(private _dialog: MatDialog) {
    this._defaultDialogConfig = {
      minWidth: '400px',
      autoFocus: false,
    };

    this._defaultButtons = [
      {
        label: 'Update password',
        action: 'done',
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
      const sub = this._matRef.afterClosed().subscribe((res) => {
        sub.unsubscribe();
        res.action === 'done' ? observer.next(res) : observer.error(res);
      });

      return () => {
        this._matRef.close();
        sub.unsubscribe();
      }
    });
  }

  /**
   * Generate config with default settings and default buttons
   * @param {IFsPasswordDialogConfig} configs
   * @returns MatDialogConfig
   */
  private composeConfig(configs: IFsPasswordDialogConfig) {

    if (!configs.buttons.length) {
      configs.buttons = this._defaultButtons;
    }

    configs.buttons.forEach((btn) => {
      btn.type = btn.action == 'done' ? 'submit' : 'button';
    });

    return Object.assign({ data: configs }, this._defaultDialogConfig );
  }
}

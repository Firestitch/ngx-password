import { Injectable } from '@angular/core';
import { IFsPasswordDialogConfig, IFsPasswordButton } from '../interfaces';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FsPasswordDialogComponent } from '../components/fs-password-dialog/fs-password-dialog.component';

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

  public open(configs: IFsPasswordDialogConfig): Promise<any> {
    this.initPromise();
    const config = this.composeConfig(configs);
    this._matRef = this._dialog.open(FsPasswordDialogComponent, config);
    this.subscribeOnClose();
    return this._promise;
  }

  public subscribeOnClose() {
    const sub = this._matRef.afterClosed().subscribe((res) => {
      sub.unsubscribe();
      res.action === 'done' ? this._resolver(res) : this._rejector(res);
    })
  }

  private initPromise() {
    this._promise = new Promise((resolve, reject) => {
      this._resolver = resolve;
      this._rejector = reject;
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
    return Object.assign({ data: configs }, this._defaultDialogConfig );
  }
}

import { Injectable } from '@angular/core';
import { IFsPasswordDialogConfig, IFsPasswordButton } from '../interfaces';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FsPasswordDialogComponent } from '../components/fs-password-dialog/fs-password-dialog.component';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FsPasswordService {
  private _defaultDialogConfig: MatDialogConfig;
  private _defaultButtons: IFsPasswordButton[];
  private _matRef: MatDialogRef<any, any>;

  private _subscriber: Subject<any>;

  constructor(private _dialog: MatDialog) {
    this._defaultDialogConfig = {
      minWidth: '400px',
      autoFocus: false,
      disableClose: true,
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

  public open(configs: IFsPasswordDialogConfig): Observable<any> {
    this._subscriber = new Subject();
    const config = this.composeConfig(configs);
    this._matRef = this._dialog.open(FsPasswordDialogComponent, config);
    this.subscribeOnClose();
    return this._subscriber.asObservable();
  }

  public subscribeOnClose() {
    const sub = this._matRef.afterClosed().subscribe((res) => {
      sub.unsubscribe();
      res.action === 'cancel' ?
        this._subscriber.error(res) : this._subscriber.next(res);

      this._subscriber.unsubscribe();
    })
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

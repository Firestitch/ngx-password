import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { FsPasswordDialogComponent } from '../components/password-dialog/password-dialog.component';
import { IFsPasswordDialogConfig } from '../interfaces/password-dialog-config.interface';
import { IFsPasswordButton } from '../interfaces/password-button.interface';


@Injectable()
export class FsPasswordService implements OnDestroy {

  private _defaultDialogConfig: MatDialogConfig;
  private _defaultButtons: IFsPasswordButton[];
  private _destroy$ = new Subject();

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
    return new Observable((observer) => {
      const config = this.composeConfig(configs);
      this._dialog.open(FsPasswordDialogComponent, config)
      .afterClosed()
        .pipe(
          takeUntil(this._destroy$)
        )
        .subscribe(res => {
          if (res && res.action === 'submit') {
            observer.next(res);
          } else {
            observer.error({ action: 'cancel' });
          }
        });
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Generate config with default settings and default buttons
   * @param config
   * @returns MatDialogConfig
   */
  private composeConfig(config: IFsPasswordDialogConfig): MatDialogConfig {

    if (!config.buttons.length) {
      config.buttons = this._defaultButtons;
    }

    config.buttons.forEach((btn) => {
      btn.type = btn.action == 'submit' ? 'submit' : 'button';
    });

    if (!config.title) {
      config.title = 'Change Password';
    }

    return {
      ...this._defaultDialogConfig,
      width: config.width || this._defaultDialogConfig.width,
      data: config,
    };
  }
}

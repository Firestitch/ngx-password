import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { IFsPasswordButton } from '../../interfaces/password-button.interface';
import { IFsPasswordDialogConfig } from '../../interfaces/password-dialog-config.interface';
import { IFsPasswordConfig } from '../../interfaces/password-config.interface';
import { takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'fs-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsPasswordDialogComponent implements OnInit, OnDestroy {

  public config: IFsPasswordConfig;

  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<FsPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFsPasswordDialogConfig,
  ) { }

  public ngOnInit() {
    this.config = {
      minLength: this.data.minLength,
      enableCurrentPassword: this.data.enableCurrentPassword,
      exclude: this.data.exclude,
      strength: this.data.strength,
      strengthConfig: this.data.strengthConfig,
    };

    this.configStylesForButtons();
  }

  public click(btn) {
    if (typeof btn.action === 'function') {
      btn.action.call();
    } else if (btn.action === 'cancel') {
      this.cancel();
    }
  }

  public submit = () => {
    return this.data.submit(this.data.newPassword, this.data.currentPassword)
      .pipe(
        tap((result) => {
          this.closeDialog({ action: 'submit', result });
        }),
        takeUntil(this._destroy$),
      );
  }

  public cancel() {
    this.closeDialog({ action: 'cancel' });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private closeDialog(result: { action: string, result?: any }) {
    this.dialogRef.close(result);
  }

  /**
   * Config obj of classes for additing it to ngClass
   */
  private configStylesForButtons() {
    this.data.buttons.forEach((btn: IFsPasswordButton) => {
      if (btn.classList && btn.classList.length) {
        btn.classes = {};
        btn.classList.forEach((cl: string) => {
          btn.classes[cl] = true;
        })
      }
    });
  }

}

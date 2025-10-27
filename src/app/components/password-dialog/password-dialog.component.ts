import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { IFsPasswordButton } from '../../interfaces/password-button.interface';
import { IFsPasswordConfig } from '../../interfaces/password-config.interface';
import { IFsPasswordDialogConfig } from '../../interfaces/password-dialog-config.interface';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsPasswordChangeComponent } from '../password-change/password-change.component';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';


@Component({
    selector: 'fs-password-dialog',
    templateUrl: './password-dialog.component.html',
    styleUrls: ['./password-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        FsDialogModule,
        CdkScrollable,
        MatDialogContent,
        FsPasswordChangeComponent,
        MatDialogActions,
        MatButton,
        NgClass,
        MatDialogClose,
    ],
})
export class FsPasswordDialogComponent implements OnInit, OnDestroy {

  public config: IFsPasswordConfig;
  public cancelButton;

  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<FsPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFsPasswordDialogConfig,
  ) { }

  public ngOnInit() {
    this.cancelButton = this.data.buttons
      .find((btn) => btn.action === 'cancel');

    this.config = {
      minLength: this.data.minLength,
      enableCurrentPassword: this.data.enableCurrentPassword,
      exclude: this.data.exclude,
      strength: this.data.strength,
      strengthConfig: this.data.strengthConfig,
    };

    this._configStylesForButtons();
  }

  public click(btn) {
    if (typeof btn.action === 'function') {
      btn.action.call();
    } else if (btn.action === 'cancel') {
      this.cancel();
    }
  }

  public submit = () => {
    return this.data
      .submit(this.data.newPassword, this.data.currentPassword)
      .pipe(
        tap((result) => {
          this._closeDialog({ action: 'submit', result });
        }),
        takeUntil(this._destroy$),
      );
  };

  public cancel() {
    this._closeDialog({ action: 'cancel' });
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _closeDialog(result: { action: string, result?: any }) {
    this.dialogRef.close(result);
  }

  /**
   * Config obj of classes for additing it to ngClass
   */
  private _configStylesForButtons() {
    this.data.buttons.forEach((btn: IFsPasswordButton) => {
      if (btn.classList && btn.classList.length) {
        btn.classes = {};
        btn.classList.forEach((cl: string) => {
          btn.classes[cl] = true;
        });
      }
    });
  }

}

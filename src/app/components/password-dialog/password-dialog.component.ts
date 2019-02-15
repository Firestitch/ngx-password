import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs';

import { IFsPasswordButton } from '../../interfaces/fs-password-button.interface';
import { IFsPasswordDialogConfig, IFsPasswordConfig } from '../../interfaces';


@Component({
  selector: 'fs-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class FsPasswordDialogComponent implements OnInit, OnDestroy {

  public config: IFsPasswordConfig;
  private subscription: Subscription;

  constructor(public dialogRef: MatDialogRef<FsPasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IFsPasswordDialogConfig) {}

  public ngOnInit() {
    this.config = {
      minLength: this.data.minLength,
      enableCurrentPassword: this.data.enableCurrentPassword,
      exclude: this.data.exclude
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

  public submit() {

    this.subscription = this.data.submit(this.data.newPassword, this.data.currentPassword).subscribe(
      res => {
        this.closeDialog({ action: 'submit', result: res });
      },
      (error) => {});
  }

  public cancel() {
    this.closeDialog({ action: 'cancel' });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

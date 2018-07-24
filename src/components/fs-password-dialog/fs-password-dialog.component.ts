import { Component, OnDestroy, Inject, OnInit } from '@angular/core';

import { IFsPasswordDialogConfig, IFsPasswordConfig } from '../../interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fs-password-dialog',
  templateUrl: './fs-password-dialog.component.html',
  styleUrls: ['./fs-password-dialog.component.scss']
})
export class FsPasswordDialogComponent implements OnInit, OnDestroy {

  public config: IFsPasswordConfig;
  private _doneSub: Subscription;

  constructor(public dialogRef: MatDialogRef<FsPasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IFsPasswordDialogConfig) {}

  public ngOnInit() {
    this.config = {
      minLength: this.data.minLength,
      enableCurrentPassword: this.data.enableCurrentPassword,
      exclude: this.data.exclude
    };
  }

  public click(action) {
    if (typeof action === 'function') {
      action.call();
    } else  if (action === 'cancel') {
      this.cancel();
    }
  }

  public done() {
    debugger;
    this._doneSub = this.data.done(this.data.newPassword, this.data.currentPassword).subscribe(
      (res) => {
        this.dialogRef.close({ action: 'done', result: res });
      },
      (error) => {});
  }

  public cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }

  public ngOnDestroy() {
    this._doneSub && this._doneSub.unsubscribe();
  }

}

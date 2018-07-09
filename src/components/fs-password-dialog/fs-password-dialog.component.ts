import { Component, OnDestroy, Inject, OnInit } from '@angular/core';

import { IFsPasswordDialogConfig, IFsPasswordConfig } from '../../interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'fs-password-dialog',
  templateUrl: './fs-password-dialog.component.html',
  styleUrls: ['./fs-password-dialog.component.scss']
})
export class FsPasswordDialogComponent implements OnInit, OnDestroy {

  public currentPassword: string;
  public newPassword: string;
  public config: IFsPasswordConfig;

  private _doneSub: Subscription;

  constructor(public dialogRef: MatDialogRef<FsPasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IFsPasswordDialogConfig) {

  }

  public ngOnInit() {
    this.config = {
      minLength: this.data.minLength,
      enableCurrentPassword: this.data.enableCurrentPassword,
      exclude: this.data.exclude
    };
  }

  public callAction(action) {
    if (typeof action === 'function') {
      action.call();
      this.dialogRef.close({ action: 'custom'});
    } else {

      switch (action) {
        case 'done': {
          this.done();
        }
          break;
        case 'cancel': {
          this.cancel();
        }
          break;
        default: {
          console.log(action, 'there is no function for this action')
        }
      }
    }
  }

  public done() {
    this._doneSub = this.data.done(this.currentPassword, this.newPassword).subscribe(
      (res) => {
        this.dialogRef.close({ action: 'done', result: res });
      },
      (error) => {
        console.error('error', error);
      });
  }

  public cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }

  public ngOnDestroy() {
    this._doneSub && this._doneSub.unsubscribe();
  }

}

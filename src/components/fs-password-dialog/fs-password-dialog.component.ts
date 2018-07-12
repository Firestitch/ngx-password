import { Component, OnDestroy, Inject, OnInit } from '@angular/core';

import { IFsPasswordDialogConfig, IFsPasswordConfig } from '../../interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { IFsPasswordButton } from '../../interfaces/fs-password-button.interface';

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

  public callAction(index: number, action = 'custom') {
      switch (action) {
        case 'done': {
          this.done();
        } break;
        case 'cancel': {
          this.cancel();
        } break;
        default: {
          const btn = this.data.buttons[index] as IFsPasswordButton;
          btn.click.call(this);
          this.closeDialog({ action: 'custom '});
        }
    }
  }

  public done() {
    this._doneSub = this.data.done(this.currentPassword, this.newPassword).subscribe(
      (res) => {
        this.closeDialog({ action: 'done', result: res });
      },
      (error) => {
        console.error('error', error);
      });
  }

  public cancel() {
    this.closeDialog({ action: 'cancel' });
  }

  public ngOnDestroy() {
    this._doneSub && this._doneSub.unsubscribe();
  }

  private closeDialog(result: { action: string, result?: any }) {
    this.dialogRef.close(result);
  }

}

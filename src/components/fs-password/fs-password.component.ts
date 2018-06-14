import { Component, Inject, OnInit } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'fs-password',
  templateUrl: 'fs-password.component.html',
  styleUrls: ['./fs-password.component.scss']
})
export class FsPasswordComponent implements OnInit {

  public minLength: number;
  public title: string;
  public enableCurrentPassword: boolean;

  public hideCurrent: boolean;
  public hideNew: boolean;
  public hideConfirm: boolean;

  public currentPassword: string;
  public newPassword: string;
  public confirmPassword: string;

  constructor(private _fsMessage: FsMessage,
              private _dialogRef: MatDialogRef<FsPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.setSetting();
  }

  public save() {
    this._fsMessage.info(`Updating ...`);

    this.data.validate(this.currentPassword, this.newPassword)
      .then((successText) => {
        this.success(successText);
        this.close();
      })
      .catch((errorText) => {
        this.invalid(errorText);
      })
  }

  public success(text?: string) {
    this._fsMessage.success(text || `Password successfully changed from "${this.currentPassword}" to "${this.newPassword}"`);
  }

  public invalid(text?: string) {
    this._fsMessage.error(text || 'Validation invalid', { mode: 'toast' });
  }

  public close() {
    this._dialogRef.close();
  }

  public forgotPassword() {
    this.data.forgontPassword();
  }

  private setSetting() {
    this.minLength = this.data && this.data.minLength || 8;
    this.title = this.data && this.data.title || 'Password';
    this.enableCurrentPassword = this.data && this.data.enableCurrentPassword;

    this.hideCurrent = true;
    this.hideNew = true;
    this.hideConfirm = true;
  }
}

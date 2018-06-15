import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { MatDialogRef } from '@angular/material';

import { FsPasswordService } from '../../../../src/services/fs-password.service';


@Component({
  selector: 'password-dialog-example',
  templateUrl: 'password-dialog-example.component.html',
})
export class PasswordDialogExampleComponent {
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

  public currentPassword: string;
  public newPassword: string;

  private _dialogRef: MatDialogRef<any>;

  constructor(private _fsMessage: FsMessage,
              private _fsPasswordService: FsPasswordService) {}

  public openDialog() {
    this._dialogRef = this._fsPasswordService.update(null, this.dialogTemplate)
  }

  public save() {
    this._fsMessage.info(`Updating ...`);

    setTimeout(() => {
      if (this.currentPassword !== this.newPassword) {
        this.success();
        this.close();
      } else {
        this.invalid('The old password shouldn\'t be equal the new password ');
      }
    }, 2000);
  }

  public close() {
    this._dialogRef.close();
  }

  public forgotPassword() {
    console.log('forgot password');
  }

  public success(text?: string) {
    this._fsMessage.success(text || `Password successfully changed from "${this.currentPassword}" to "${this.newPassword}"`);
  }

  public invalid(text?: string) {
    this._fsMessage.error(text || 'Validation invalid', { mode: 'toast' });
  }
}

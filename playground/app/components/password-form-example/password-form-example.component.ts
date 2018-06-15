import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';


@Component({
  selector: 'password-form-example',
  templateUrl: 'password-form-example.component.html',
})
export class PasswordFormExampleComponent {

  public currentPassword: string;
  public newPassword: string;

  constructor(private _fsMessage: FsMessage) {}

  public save() {
    this._fsMessage.info(`Updating ...`);

    setTimeout(() => {
      if (this.currentPassword !== this.newPassword) {
        this.success();
      } else {
        this.invalid('The old password shouldn\'t be equal the new password ');
      }
    }, 2000);
  }

  public success(text?: string) {
    this._fsMessage.success(text || `Password successfully changed from "${this.currentPassword}" to "${this.newPassword}"`);
  }

  public invalid(text?: string) {
    this._fsMessage.error(text || 'Validation invalid', { mode: 'toast' });
  }
}

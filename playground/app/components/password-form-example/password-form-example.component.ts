import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';


@Component({
  selector: 'password-form-example',
  templateUrl: 'password-form-example.component.html',
})
export class PasswordFormExampleComponent {

  public currentPassword: string;
  public newPassword: string;
  public config;

  constructor(private _fsMessage: FsMessage) {
    this.config = {
      minLength: 3,
      enableCurrentPassword: true,
      exclude: ['admin', 'god', 'password']
    };
  }

  public submit() {
    this._fsMessage.info(`Updating ...`);
    setTimeout(() => {
      const msg = `Password successfully changed from "${this.currentPassword}" to "${this.newPassword}"`;
      this._fsMessage.success(msg);
    }, 1000);
  }
}

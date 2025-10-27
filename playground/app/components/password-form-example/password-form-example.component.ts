import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { IFsPasswordConfig } from '@firestitch/password';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsPasswordChangeComponent } from '../../../../src/app/components/password-change/password-change.component';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'password-form-example',
    templateUrl: 'password-form-example.component.html',
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        FsPasswordChangeComponent,
        MatButton,
    ],
})
export class PasswordFormExampleComponent {

  public currentPassword: string;
  public newPassword: string;
  public config: IFsPasswordConfig;

  constructor(private _fsMessage: FsMessage) {
    this.config = {
      minLength: 3,
      strength: true,
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

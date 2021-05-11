import { Component } from '@angular/core';
import { IFsPasswordConfig } from '@firestitch/password';


@Component({
  selector: 'password-mask',
  templateUrl: 'password-mask.component.html',
})
export class PasswordMaskComponent {

  public password;

  public passwordConfig: IFsPasswordConfig = {
    minLength: 3,
    exclude: ['test', 'email@email.com']
  };

  constructor() {
  }

}

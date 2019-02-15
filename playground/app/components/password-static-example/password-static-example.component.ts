import { Component } from '@angular/core';
import { IFsPasswordConfig } from '@firestitch/password';


@Component({
  selector: 'password-static-example',
  templateUrl: 'password-static-example.component.html',
})
export class PasswordStaticExampleComponent {

  public passwordConfig: IFsPasswordConfig = {
    minLength: 3,
    exclude: ['test', 'email@email.com']
  };

  constructor() {
  }

}

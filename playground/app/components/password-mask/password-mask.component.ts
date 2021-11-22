import { Component } from '@angular/core';
import { IFsPasswordConfig } from '@firestitch/password';
import { of } from 'rxjs';


@Component({
  selector: 'password-mask',
  styleUrls: ['password-mask.component.scss'],
  templateUrl: 'password-mask.component.html',
})
export class PasswordMaskComponent {

  public password;
  public username;

  public passwordConfig: IFsPasswordConfig = {
    minLength: 3,
    exclude: ['test', 'email@email.com']
  };

  submit = () => {
    return of(true);
  }

}

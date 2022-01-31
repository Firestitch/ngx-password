import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IFsPasswordConfig } from '@firestitch/password';
import { of } from 'rxjs';


@Component({
  selector: 'password-meter',
  styleUrls: ['password-meter.component.scss'],
  templateUrl: 'password-meter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordMeterComponent {

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

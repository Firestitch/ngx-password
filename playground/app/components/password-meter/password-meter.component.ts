import { ChangeDetectionStrategy, Component } from '@angular/core';

import { of } from 'rxjs';


@Component({
  selector: 'password-meter',
  styleUrls: ['password-meter.component.scss'],
  templateUrl: 'password-meter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordMeterComponent {

  public password = '';

  submit = () => {
    return of(true);
  }

}

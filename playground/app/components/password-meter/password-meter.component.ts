import { ChangeDetectionStrategy, Component } from '@angular/core';

import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsPasswordComponent } from '../../../../src/app/components/password/password.component';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'password-meter',
    styleUrls: ['/password-meter.component.scss'],
    templateUrl: 'password-meter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatInput,
        FsPasswordComponent,
        MatButton,
    ],
})
export class PasswordMeterComponent {

  public password = '';

  public submit = () => {
    return of(true);
  };

}

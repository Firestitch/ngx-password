import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { IFsPasswordConfig } from '@firestitch/password';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsPasswordComponent } from '../../../../src/app/components/password/password.component';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'password-mask',
    styleUrls: ['./password-mask.component.scss'],
    templateUrl: './password-mask.component.html',
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
export class PasswordMaskComponent {
  private _message = inject(FsMessage);

 
  public password = 'test';
  public username;

  public passwordConfig: IFsPasswordConfig = {
    minLength: 3,
    exclude: ['test', 'email@email.com'],
  };

  public submit = () => {
    return of(true)
      .pipe(
        tap(() => {
          this._message.success('Submitted');
        }),
      );
  };

}

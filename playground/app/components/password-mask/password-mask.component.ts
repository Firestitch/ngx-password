import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { IFsPasswordConfig } from '@firestitch/password';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'password-mask',
  styleUrls: ['password-mask.component.scss'],
  templateUrl: 'password-mask.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordMaskComponent {
 
  public password;
  public username;

  public passwordConfig: IFsPasswordConfig = {
    minLength: 3,
    exclude: ['test', 'email@email.com']
  };

  public constructor(
    private _message: FsMessage,
  ) {}

  submit = () => {
    return of(true)
    .pipe(
      tap(() => {
        this._message.success('Submitted');
      })
    );
  }

}

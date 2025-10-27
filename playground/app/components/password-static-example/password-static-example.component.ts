import { Component } from '@angular/core';
import { IFsPasswordConfig } from '@firestitch/password';
import { FsPasswordChangeComponent } from '../../../../src/app/components/password-change/password-change.component';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'password-static-example',
    templateUrl: 'password-static-example.component.html',
    standalone: true,
    imports: [FsPasswordChangeComponent, JsonPipe],
})
export class PasswordStaticExampleComponent {

  public passwordConfig: IFsPasswordConfig = {
    minLength: 3,
    exclude: ['test', 'email@email.com']
  };

  constructor() {
  }

}

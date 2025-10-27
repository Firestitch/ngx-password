import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { PasswordMeterComponent } from './components/password-meter/password-meter.component';
import { PasswordMaskComponent } from './components/password-mask/password-mask.component';
import { PasswordDialogExampleComponent } from './components/password-dialog-example/password-dialog-example.component';
import { PasswordFormExampleComponent } from './components/password-form-example/password-form-example.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsExampleModule,
        PasswordMeterComponent,
        PasswordMaskComponent,
        PasswordDialogExampleComponent,
        PasswordFormExampleComponent,
    ],
})
export class AppComponent {
  public config = environment;
}

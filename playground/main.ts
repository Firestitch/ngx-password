import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { provideRouter } from '@angular/router';
import { FsDialogModule } from '@firestitch/dialog';
import { FsExampleModule } from '@firestitch/example';
import { FsPasswordModule } from '@firestitch/password';
import { FsMessageModule } from '@firestitch/message';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FsFormModule, FsDialogModule.forRoot(), FsExampleModule.forRoot(), FsPasswordModule.forRoot(), FsMessageModule.forRoot()),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
        provideAnimations(),
        provideRouter([])
    ]
})
  .catch(err => console.error(err));


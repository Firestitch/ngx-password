import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FsDialogModule } from '@firestitch/dialog';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';
import { FsPasswordModule } from '@firestitch/password';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import {
  PasswordDialogExampleComponent,
  PasswordFormExampleComponent,
  PasswordMaskComponent,
  PasswordMeterComponent,
  PasswordStaticExampleComponent,
} from './components';
import { AppMaterialModule } from './material.module';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    FsFormModule,
    RouterModule.forRoot([], {}),
    FsDialogModule.forRoot(),
    FsExampleModule.forRoot(),
    FsPasswordModule.forRoot(),
    FsMessageModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    PasswordStaticExampleComponent,
    PasswordFormExampleComponent,
    PasswordDialogExampleComponent,
    PasswordMaskComponent,
    PasswordMeterComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ]
})
export class PlaygroundModule {
}

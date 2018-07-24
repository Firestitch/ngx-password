import './styles.scss';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from './app/material.module';

import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsPasswordModule } from '../src';

import { AppComponent } from './app/app.component';
import { FsMessageModule } from '@firestitch/message';
import { ToastrModule } from 'ngx-toastr';

import {
  PasswordStaticExampleComponent,
  PasswordFormExampleComponent,
  PasswordDialogExampleComponent
} from './app/components';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    AppMaterialModule,
    FsFormModule,
    FsExampleModule,
    FsPasswordModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    PasswordStaticExampleComponent,
    PasswordFormExampleComponent,
    PasswordDialogExampleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}

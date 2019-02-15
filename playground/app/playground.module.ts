import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsPasswordModule } from '@firestitch/password';

import { FsMessageModule } from '@firestitch/message';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './material.module';

import {
  PasswordStaticExampleComponent,
  PasswordFormExampleComponent,
  PasswordDialogExampleComponent
} from './components';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    AppMaterialModule,
    FsFormModule,
    FsExampleModule.forRoot(),
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

import './styles.scss';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from './app/material.module';

import { FsExampleModule } from '@firestitch/example';
import { FsPasswordModule } from '../src';

import { AppComponent } from './app/app.component';
import { PasswordExampleComponent } from './app/components';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    AppMaterialModule,

    FsExampleModule,
    FsPasswordModule,
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    PasswordExampleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}

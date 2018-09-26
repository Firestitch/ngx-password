import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
} from '@angular/material';

import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';

import { FsPasswordComponent } from './components';
import { FsPasswordService } from './services';
import { FsPasswordDialogComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    // FLEX
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,

    FsFormModule,
    FsMessageModule,
  ],
  exports: [
    FsPasswordComponent,
    FsPasswordDialogComponent
  ],
  entryComponents: [
    FsPasswordComponent,
    FsPasswordDialogComponent,
  ],
  declarations: [
    FsPasswordComponent,
    FsPasswordDialogComponent,
  ],
  providers: [
  ],
})
export class FsPasswordModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsPasswordModule,
      providers: [ FsPasswordService ]
    };
  }
}

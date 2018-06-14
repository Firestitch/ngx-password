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

import { FsPasswordComponent } from './components/fs-password/fs-password.component';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';

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
  ],
  entryComponents: [
    FsPasswordComponent,
  ],
  declarations: [
    FsPasswordComponent,
  ],
  providers: [
  ],
})
export class FsPasswordModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsPasswordModule
    };
  }
}

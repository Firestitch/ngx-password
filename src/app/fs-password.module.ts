import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';
import { FsDialogModule } from '@firestitch/dialog';

import { FsPasswordChangeComponent } from './components/password-change/password-change.component';
import { FsPasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { FsPasswordComponent } from './components/password/password.component';

import { FsPasswordService } from './services/password.service';


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
    FsDialogModule
  ],
  exports: [
    FsPasswordChangeComponent,
    FsPasswordDialogComponent,
    FsPasswordComponent
  ],
  declarations: [
    FsPasswordChangeComponent,
    FsPasswordDialogComponent,
    FsPasswordComponent
  ],
})
export class FsPasswordModule {
  static forRoot(): ModuleWithProviders<FsPasswordModule> {
    return {
      ngModule: FsPasswordModule,
      providers: [ FsPasswordService ]
    };
  }
}

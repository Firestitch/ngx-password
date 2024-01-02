import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';

import { FsPasswordChangeComponent } from './components/password-change/password-change.component';
import { FsPasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { FsPasswordComponent } from './components/password/password.component';
import { FsPasswordService } from './services/password.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,

    FsFormModule,
    FsMessageModule,
    FsDialogModule,
  ],
  exports: [
    FsPasswordChangeComponent,
    FsPasswordDialogComponent,
    FsPasswordComponent,
  ],
  declarations: [
    FsPasswordChangeComponent,
    FsPasswordDialogComponent,
    FsPasswordComponent,
  ],
})
export class FsPasswordModule {
  public static forRoot(): ModuleWithProviders<FsPasswordModule> {
    return {
      ngModule: FsPasswordModule,
      providers: [FsPasswordService],
    };
  }
}

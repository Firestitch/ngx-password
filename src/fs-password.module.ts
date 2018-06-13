import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsPasswordComponent } from './components/fs-password/fs-password.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsPasswordComponent,
  ],
  entryComponents: [
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

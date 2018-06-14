import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FsPasswordComponent } from '../../../../src/components';


@Component({
  selector: 'password-example',
  templateUrl: 'password-example.component.html',
})
export class PasswordExampleComponent {

  public validationFunction = ((currentPassword, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentPassword !== password) {
          resolve(null);
        } else {
          reject("The old password shouldn't be equal the new password");
        }
      }, 2000);
    });
  });

  constructor(private _dialog: MatDialog) {}

  public openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.minWidth = '400px';
    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      title: 'Change Password',
      minLength: 6,
      enableCurrentPassword: true,
      exclude: ['text'],
      validate: this.validationFunction,
      forgontPassword: () => {
        console.log('forgot password');
      }
    };

    const dialogRef = this._dialog.open(FsPasswordComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }
}

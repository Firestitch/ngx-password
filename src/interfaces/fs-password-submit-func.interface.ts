import { Observable } from 'rxjs/Observable';

export interface ISubmitFunc {
  (newPassword: string, currentPassword: string): Observable<any>
}

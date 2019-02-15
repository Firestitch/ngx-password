import { Observable } from 'rxjs';

export interface ISubmitFunc {
  (newPassword: string, currentPassword: string): Observable<any>
}

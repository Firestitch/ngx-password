import { Observable } from 'rxjs/Observable';

export interface IDoneFunc {
  (newPassword: string, currentPassword: string): Observable<any>
}

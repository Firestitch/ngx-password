import { Observable } from 'rxjs/Observable';

export interface IDoneFunc {
  (password: string, currentPassword: string): Observable<any>
}

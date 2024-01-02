import { Observable } from 'rxjs';

export type ISubmitFunc = (newPassword: string, currentPassword: string) => Observable<any>;

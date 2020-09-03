import { Observable } from 'rxjs';
import { Login} from './../../models/login/login.namespace';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';

@Injectable()
export class CheckService {

    constructor(private http: HttpClient,
        private constants: ConstantsService) {}

    // public sendError(url: string) : Observable<Error.ErrorResponse>{
    //     return this.http.get<Error.ErrorResponse>(url);
    // }
    public checkToken(token: string): Observable<Login.Token> {
       return this.http.get<Login.Token>(this.constants.SERVER_ADDRESS + '/services/checktoken/' + token);
    }
}

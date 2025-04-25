import { HttpContext,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,  }  from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { HttpContextToken } from '@angular/common/http';
import { SiteVerifyRequest } from '../interface/SiteVerifyReq';


const BYPASS_LOG = new HttpContextToken(()=>false);

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  context: new HttpContext().set(BYPASS_LOG, true) 
};

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {


  private SERVER_URL_BACKEND2 = environment.apiURLValidateProvider2;

  constructor(private http: HttpClient) { }


  private sendPost(url_backend:string, body: any): Observable<any> {

    return this.http.post(url_backend, body, httpOptions)
    .pipe(
        shareReplay(1)
    );
  }


  validateTurnstile(request: SiteVerifyRequest): Observable<any> {

    let URL_BACKEND:string = this.SERVER_URL_BACKEND2 + `/validate/`; 

    return this.sendPost(URL_BACKEND, request);
  }



}

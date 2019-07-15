import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { InterceptorSkipHeader } from "../interceptor/http.token.interceptor";

@Injectable({
    providedIn: 'root',
})
export class ApiService{
    constructor(private http :HttpClient){}

    get(path: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}${path}`)
      }
    post(path:string ,body:object):Observable<any>    {
        return this.http.post(`${environment.apiUrl}${path}`,JSON.stringify(body));
    }
    patch(path:string,body:object={}):Observable<any>{
        return this.http.patch(`${environment.apiUrl}${path}`,JSON.stringify(body));
    }
    put(path:string ,body:object={}):Observable<any>{
        return this.http.put(`${environment.apiUrl}${path}`,JSON.stringify(body));
    }
    delete(path:string):Observable<any>{
        return this.http.delete(`${environment.apiUrl}${path}`);
    }
    
}
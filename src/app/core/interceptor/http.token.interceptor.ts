import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtService } from "../service/jwt.service";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { UserService } from "../service/user.service";
import { Injectable } from "@angular/core";
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor{
    constructor(private jwtService :JwtService,private router :Router,private userService :UserService){}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
     if (req.headers.has(InterceptorSkipHeader)) {
            const headers = req.headers.delete(InterceptorSkipHeader);
            return next.handle(req.clone({ headers }));
          }
            const headerConfig = {
                "Content-Type":"application/json",
                Accept:"application/json"
            }
            const token  = this.jwtService.getToken()
            if(token){ 
                headerConfig['token']=`JWT ${token}`
            }
            const request = req.clone({ setHeaders: headerConfig });
    return next.handle(request).pipe(
      tap(
        event => {
        
        },
        error => {
          this.handleAuthError(error);
        }
      )
    );
      }
      private handleAuthError(err: HttpErrorResponse) {
        //handle your auth error or rethrow
        const isUnauthorized: boolean = err.status === 401;
        const isForbidden: boolean = err.status === 403;
        const noInternet: boolean = err.status === 0;
    
        if (isUnauthorized) {
          this.userService.purgeAuth();
        }
        if (isForbidden) {
          this.router.navigateByUrl(`/home`);
        }
        if (noInternet) {
        //   this.messageService.failureMessage("No Internet Connection.");
        }
      }
}
export const InterceptorSkipHeader = "X-Skip-Interceptor";
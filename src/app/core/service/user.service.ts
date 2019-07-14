import { Injectable } from "@angular/core";
import { JwtService } from "./jwt.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class UserService{

constructor(public jwtService :JwtService,private router :Router){}
   populate(){
       if(this.jwtService.getToken()){
        this.router.navigateByUrl("/home");
       }else{
            this.purgeAuth();
       }
   }

   /** Method to destroy token  */
   purgeAuth():void{
    this.jwtService.removeToken();
    this.router.navigateByUrl("/auth/login");
   }
}
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class JwtService{
    constructor(){}

    saveToken(token :string):void{
        window.localStorage.setItem('jwtToken', token);
    }

    getToken():string{
        return window.localStorage.getItem('jwtToken');
    }

    removeToken():void{
        window.localStorage.removeItem("jwtToken");
    }

}
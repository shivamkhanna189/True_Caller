import { AuthComponent } from "./auth.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule, Router } from "@angular/router";
import { LoginComponent } from "./login/login.component";

const routes:Routes= [{
        path:"auth",
        component :AuthComponent,
        children:[
            {path:"login",
             component :LoginComponent
            }
            
        ]
}]

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class AuthRouting{

}
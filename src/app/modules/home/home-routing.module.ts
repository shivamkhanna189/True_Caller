import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";

const routes:Routes=[{
    path :"",
    component :HomeComponent,
    children:[{
        path:"",
        redirectTo:"list",
        pathMatch:"full"
    },
    {
            path:"list",
            component: ListComponent
    }
    ]
}]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class HomeRouting{

}
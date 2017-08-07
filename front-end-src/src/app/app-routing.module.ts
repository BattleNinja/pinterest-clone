import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'not-found', component: NotfoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

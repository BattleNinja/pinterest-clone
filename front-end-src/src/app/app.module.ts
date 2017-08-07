import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HttpModule} from '@angular/http';
import {LinkService} from './services/link.service';
import {ProfileComponent} from './components/profile/profile.component';
import { MasonryModule } from 'angular2-masonry';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotfoundComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MasonryModule
  ],
  providers: [AuthService, LinkService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

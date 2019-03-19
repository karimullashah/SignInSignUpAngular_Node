import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';


import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule
} from '@angular/material';

import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { UsersComponent } from './UserManagement/users/users.component';
import { UsersListComponent } from './UserManagement/users/users-list/users-list.component';
import { UsersDetailsComponent } from './UserManagement/users/users-details/users-details.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    HomeComponent,
    UsersComponent,
    UsersListComponent,
    UsersDetailsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [AuthService,{provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

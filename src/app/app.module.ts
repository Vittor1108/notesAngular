import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LostPasswordComponent } from './pages/login/lost-password/lost-password.component';
import { NewUserComponent } from './pages/login/new-user/new-user.component';
import { SignComponent } from './pages/login/sign/sign.component';
import { NameInputComponent } from './components/form/name-input/name-input.component';
import { EmailInputComponent } from './components/form/email-input/email-input.component';
import { PasswordInputComponent } from './components/form/password-input/password-input.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    LoginComponent,
    LostPasswordComponent,
    NewUserComponent,
    SignComponent,
    NameInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

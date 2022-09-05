import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LostPasswordComponent } from './pages/login/lost-password/lost-password.component';
import { NewUserComponent } from './pages/login/new-user/new-user.component';
import { SignComponent } from './pages/login/sign/sign.component';
import { HomeCardsComponent } from './pages/home/home-cards/home-cards.component';
import { DocumentsCardComponent } from './pages/home/documents-card/documents-card.component';



@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    LoginComponent,
    LostPasswordComponent,
    NewUserComponent,
    SignComponent,
    HomeCardsComponent,
    DocumentsCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

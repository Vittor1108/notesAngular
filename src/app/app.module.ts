import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';


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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateNoteDialogComponent } from './components/create-note-dialog/create-note-dialog.component';
import { ReadNoteDialogComponent } from './components/read-note-dialog/read-note-dialog.component';



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
    CreateNoteDialogComponent,
    ReadNoteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

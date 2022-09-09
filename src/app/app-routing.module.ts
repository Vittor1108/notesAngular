import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignGuard } from './guards/sign-guard.guard';
import { DocumentsCardComponent } from './pages/home/documents-card/documents-card.component';
import { HomeCardsComponent } from './pages/home/home-cards/home-cards.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LostPasswordComponent } from './pages/login/lost-password/lost-password.component';
import { NewUserComponent } from './pages/login/new-user/new-user.component';
import { SignComponent } from './pages/login/sign/sign.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeCardsComponent,
        resolve: {}
      },
      { path: 'documents', component: DocumentsCardComponent },
    ],
    canActivate: [SignGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'lost-password', component: LostPasswordComponent },
      { path: 'new-user', component: NewUserComponent },
      { path: 'sign', component: SignComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

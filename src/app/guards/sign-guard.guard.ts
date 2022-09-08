import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class SignGuard implements CanActivate {
  constructor(private router: Router) {}

  isLogado: any = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userConnect();
    // if(!this.isLogado) this.router.navigate(['/login/sign']);
    if(localStorage.getItem('logado') !==  null) this.isLogado = true;
    return this.isLogado;
  }

  userConnect() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user): void => {
      if (user) {
        const uid = user.uid;
        localStorage.setItem('logado', uid);
        this.isLogado = true;
        // console.log(user);
      } else {
        this.isLogado = false;
        this.router.navigate(['/login/sign']);
      }
    });
  }
}

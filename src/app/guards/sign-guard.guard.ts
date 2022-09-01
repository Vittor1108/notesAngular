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
  constructor(private router: Router) {
    this.userConnect();
  }

  acessRoute: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.acessRoute){
        this.router.navigate(['']);
      }else{
        this.router.navigate(['/login/sign']);
      }
    return this.acessRoute;
  }
  userConnect() {
    const auth = getAuth();
    const logado = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.acessRoute = true;
        console.log("Usuário está logado");
      } else {
        console.log('Usuário não está logado');
        this.acessRoute = false;
      }
    });
  }
}

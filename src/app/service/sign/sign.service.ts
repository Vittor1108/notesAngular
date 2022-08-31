import { Injectable } from '@angular/core';
import { Firebase } from 'src/app/service/firebase/firebase-config.service';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SignService {
  constructor(private router: Router) {
    Firebase;
  }

  signSocialMedia(social:string) {
    if(social === 'google'){
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential!.accessToken;
          const user = result.user;
          this.router.navigate(['/']);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(error)
        });
    }else{
      console.log("Ativou o Service, logar com o face")
    }
  }
}

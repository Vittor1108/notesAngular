import { Injectable } from '@angular/core';
import { Firebase } from 'src/app/service/firebase/firebase-config.service';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SignService {
  constructor(private router: Router) {
    Firebase;
  }

  errorMessage: string = '';

  signSocialMedia(social: string) {
    const auth = getAuth();
    if (social === 'google') {
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
        });
    } else {
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential!.accessToken;
          this.router.navigate(['/']);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }
  }

  createNewUser(dataUser: { email: string; password: string }) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, dataUser.email, dataUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async sign(dataUser: { name: string; password: string }) {
    const auth = getAuth();
    const request = await signInWithEmailAndPassword(
      auth,
      dataUser.name,
      dataUser.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['']);
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorCode;
      });

    return request;
  }

  async resetPasswrod(email: string) {
    const auth = getAuth();
    const validation = await sendPasswordResetEmail(auth, email)
      .then(() => {
        this.router.navigate(['/login/sign']);
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorCode;
      });
    return validation;
  }

  signOut(){
    getAuth().signOut()
    .then(()=> {
      this.router.navigate(['/login/sign']);
    })
    .catch(error => {
      console.log("Deu ruim");
    })
  }
}

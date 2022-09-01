import { Component, OnInit } from '@angular/core';
import { SignService } from 'src/app/service/sign/sign.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { provideProtractorTestingSupport } from '@angular/platform-browser';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  constructor(
    private signService: SignService,
    private formBuilder: FormBuilder
  ) {}

  form!: FormGroup;
  errorEmail: boolean = false;
  errorPassword: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  signWithSocialMedia(social: string): void {
    this.signService.signSocialMedia(social);
  }

  async handleSubmit() {
    const dataUser: { name: string; password: string } = this.form.value;
    const requestLogin = await this.signService.sign(dataUser);
    if (requestLogin !== true) {
      if (requestLogin === 'auth/invalid-email') {
        this.errorEmail = true;
      } else if (requestLogin === 'auth/wrong-password') {
        this.errorPassword = true;
      }
    }
  }


  removeError(campo:string):void{
   if(campo === 'email'){
    this.errorEmail = false;
   }

   if(campo === 'password'){
    this.errorPassword = false;
   }
  }
}

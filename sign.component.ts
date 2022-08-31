import { Component, OnInit } from '@angular/core';
import { SignService } from 'src/app/service/sign/sign.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  constructor(private signService: SignService, private formBuilder: FormBuilder) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  signWithSocialMedia(social:string):void{
    this.signService.signSocialMedia(social);
  }

  handleSubmit(){
    const dataUser: {name: string, password:string} = this.form.value;
    this.signService.sign(dataUser);
  }


}

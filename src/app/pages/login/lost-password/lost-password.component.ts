import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { SignService } from 'src/app/service/sign/sign.service';
@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private signService: SignService) {

   }

  form!: FormGroup;
  errorRequest: any = null;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async handleSubmit(){
    const request  = await this.signService.resetPasswrod(this.form.value.email);
    request !== true ? this.errorRequest = true : this.errorRequest = false;
  }


}

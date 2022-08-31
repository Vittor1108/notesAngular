import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validatorName } from 'src/app/validators/name-validator';
import { confirmPassword } from 'src/app/validators/confirm-password';
import { SignService } from 'src/app/service/sign/sign.service';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private signService: SignService) {}


  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, validatorName]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required, confirmPassword]],
    });
  }

  handleSubmit(): void{
    const valueForm: {name: string, email: string, password: string} = this.form.value;
    const {email, password} = valueForm;
    this.signService.createNewUser({email, password});
  }

}

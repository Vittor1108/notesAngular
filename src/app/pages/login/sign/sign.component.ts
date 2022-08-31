import { Component, OnInit } from '@angular/core';
import { SignService } from 'src/app/service/sign/sign.service';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  constructor(private signService: SignService) {}

  ngOnInit(): void {}

  signWithSocialMedia(social:string){
    this.signService.signSocialMedia(social);
  }

}

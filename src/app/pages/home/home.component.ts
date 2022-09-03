import { Component, OnInit } from '@angular/core';
import { SignService } from 'src/app/service/sign/sign.service';
import { Auth } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sign: SignService) { }

  ngOnInit(): void {
  }

  signOut(){
    this.sign.signOut();
    localStorage.removeItem('logado');
  }

}

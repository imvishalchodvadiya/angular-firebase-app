import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public user = {
    email: '',
    password:''
  }

  constructor(public AuthService: AuthService) { 
    
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return true;
    }
    this.AuthService.login(form.value.email, form.value.password);
  }

}

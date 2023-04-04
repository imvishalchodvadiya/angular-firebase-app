import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.sass']
})
export class ChangepasswordComponent implements OnInit {

  public forgetpwd = {
    email: ''
  }
  
  isLoader = false;

  constructor(private toastr: ToastrService,private AuthService:AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  pwd(form: NgForm) {
    
    if (form.invalid) {
      return;
    }
    this.AuthService.forgotpassword(this.forgetpwd.email)
    this.toastr.success('Password reset email sent, check your inbox');
    this.router.navigate(['login']);
    // return;

  }   


}

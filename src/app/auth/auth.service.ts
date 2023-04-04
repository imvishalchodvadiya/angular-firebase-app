import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = new Subject<boolean>();
  public isAuthenticated = false;
  constructor(private afAuth: AngularFireAuth,
   private afs: AngularFirestore,
    private router: Router) { }
  
  isAuthCall() {
    // console.log(this.isAuthenticated);
    return this.isAuthenticated;
  }
  
  getIsAuth(){
    return this.isAuth.asObservable();
  }  
  
  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        localStorage.setItem("token", 'true');
        this.isAuth.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['home']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
  
   autoAuthUser() {
      const authInformation = localStorage.getItem("token");
      if (!authInformation) {
        return;
      }
      this.isAuthenticated = true;
      this.isAuth.next(true);
   }

  logout() {
    localStorage.setItem("token", '');
    this.afAuth.auth.signOut();
    this.isAuthenticated = false;
    this.isAuth.next(false);
    this.router.navigate(['login']);
  }
    
  forgotpassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

}

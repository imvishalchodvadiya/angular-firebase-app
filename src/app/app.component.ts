import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  isMenu = false;

  private authListenerSubs: Subscription;

  constructor(private AuthService:AuthService) {   
    
  }
  ngOnInit(): void {

   this.AuthService.autoAuthUser();
    
   this.checkMenu();  
    
  }

  async checkMenu() {
      this.authListenerSubs = await this.AuthService.getIsAuth().subscribe(data => {
        this.isMenu = data;
      });

    if (this.isMenu == false) {
      this.isMenu = await this.AuthService.isAuthCall();
      // console.log(this.AuthService.isAuthCall());
    }
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

}

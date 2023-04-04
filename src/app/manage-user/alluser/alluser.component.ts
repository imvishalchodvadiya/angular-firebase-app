import { Component, OnInit } from '@angular/core';
import { UserService } from '../../home/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.sass']
})
export class AlluserComponent implements OnInit {
  private activeMemberDataSubs: Subscription;
  public activeMemberData = [];

  constructor(private ngxService: NgxUiLoaderService, public UserService: UserService) { }

  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 5000);
    
    this.activeMember();
  }

  activeMember() {    
    this.UserService.getActiveMembers();
    this.activeMemberDataSubs = this.UserService.getActiveMemberData().subscribe(data => {
      this.activeMemberData = data;
    });
  }
ngOnDestroy(): void {
    this.activeMemberDataSubs.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {

  isOpen = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  open() {
    this.isOpen = true;
    // this.router.navigate(['home']);
  }

}

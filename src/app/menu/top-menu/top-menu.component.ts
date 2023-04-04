import { Component, OnInit,ElementRef, Renderer2,HostListener  } from '@angular/core';
import { UserService } from '../../home/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent implements OnInit {
  isOpen = false;
  isBody = false;

  constructor(private renderer: Renderer2,private AuthService:AuthService,private el: ElementRef) { }
  
  ngOnInit(): void {
    //  this.el.nativeElement.querySelector('body').addEventListener('click', this.mobileMenu.bind(this));
  }
@HostListener('document:click', ['$event']) clickout(event) {
      this.renderer.removeClass(document.body,'toggle-menu');
      this.isBody = false;
 }
  open() {
    if (this.isOpen == false) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  
  }
  mobileMenu(event: Event) {
     event.stopPropagation();
  let bodyTag = this.el.nativeElement.querySelector("body");
    
  if(this.isBody == false) {
      this.renderer.addClass(document.body,'toggle-menu');
      this.isBody = true;
  } else {
      this.renderer.removeClass(document.body,'toggle-menu');
      this.isBody = false;
    }
  }
  
  onLogout() {
    this.AuthService.logout();
  }
}

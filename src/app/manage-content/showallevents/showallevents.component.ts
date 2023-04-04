import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ManageContentService } from '../manage-content.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-showallevents',
  templateUrl: './showallevents.component.html',
  styleUrls: ['./showallevents.component.sass']
})
export class ShowalleventsComponent implements OnInit {

  public eventData;
  private eventDataSubs: Subscription;
  showEventDisplay: boolean;
  eventtitle: string; 
  eventimage: string;
  eventdate: string;
  eventcontent: string;
  eventlocation: string;
  
  constructor(private ngxService: NgxUiLoaderService,private db: AngularFirestore, public ManageContentService: ManageContentService, private toastr: ToastrService) { }

  ngOnInit(): void {

      this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 5000);

    this.ManageContentService.getEvent();
    
    this.eventDataSubs = this.ManageContentService.getEventData().subscribe(data => {
      this.eventData = this.sortData(data);
    });
  }


  showEventDisplayPopup(data)
{
  this.showEventDisplay = true;  
  this.eventtitle = data.title; 
  this.eventimage = data.image;
  this.eventdate = data.date;
  this.eventcontent = data.content;
  this.eventlocation= data.place;
  }
  hide()
  {
   this.showEventDisplay = false;
  } 
 sortData(data) {
    return data.sort((a, b) => {
      return <any>new Date(b.data.created_at) - <any>new Date(a.data.created_at);
    });
  } 
  onEventDelete(id) {
    console.log(id);
    this.db.collection("event").doc(id).delete().then(res => {
        this.toastr.success('Event Deleted sucessfully !!!');
        this.ngOnInit();
    })
  }
  ngOnDestroy(): void {
    this.eventDataSubs.unsubscribe();
  }
}

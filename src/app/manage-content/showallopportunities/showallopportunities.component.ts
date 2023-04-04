import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ManageContentService } from '../manage-content.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-showallopportunities',
  templateUrl: './showallopportunities.component.html',
  styleUrls: ['./showallopportunities.component.sass']
})
export class ShowallopportunitiesComponent implements OnInit {

  public opportunityData;
  private opportunityDataSubs: Subscription;
  
  showModal: boolean;
  image: string;
  title: string;
  content: string;
  date: string;
  company: string;
  location: string;
  core: string;
  type: string;
  companyIndustry: string;
  senioritylevel: string;

  constructor( private ngxService: NgxUiLoaderService,private db: AngularFirestore,private ManageContentService:ManageContentService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 5000);

    this.ManageContentService.getOpportunity();
    
    this.opportunityDataSubs = this.ManageContentService.getOpportunityData().subscribe(data => {
      this.opportunityData = this.sortData(data);
      console.log(this.opportunityData);
    });

  }

  sortData(data) {
    return data.sort((a, b) => {
      return <any>new Date(b.data.created_at) - <any>new Date(a.data.created_at);
    });
  }

  ngOnDestroy(): void {
    this.opportunityDataSubs.unsubscribe();
  }

  
show(data)
{
  this.showModal = true;  
  this.title = data.title; 
  this.image = data.image;
  this.date = data.created_at;
  this.content = data.description;
  this.company= data.company;
  this.location= data.location;
  this.core= data.core;
  this.type= data.type;
  this.companyIndustry= data.companyIndustry;
  this.senioritylevel= data.senioritylevel;
}

hide()
{
  this.showModal = false;
}
  
onDelete(id) {
    this.db.collection("opportunities").doc(id).delete().then(res => {
        this.toastr.success('Opportunity Deleted sucessfully !!!');
        this.ngOnInit();
    })
  }  
}

import { Component, OnInit,EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ManageContentService } from '../manage-content.service';
import { NgForm } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router,ParamMap,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-opportunities',
  templateUrl: './add-opportunities.component.html',
  styleUrls: ['./add-opportunities.component.sass']
})
export class AddOpportunitiesComponent implements OnInit {

  public addOpp = {
    created_at:new Date().toLocaleString(),
    company:'',
    title:'',
    location:'',
    core:'',
    companyIndustry:'',
    type:'',
    senioritylevel:'',
    description:'',
    image:'',
  }

 public selectedImage:File = null;  
  url: any;
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  isLoader = false;
  oppData: any;
  private mode = "create";

 constructor( private ngxService: NgxUiLoaderService,public ManageContentService: ManageContentService,private storage: AngularFireStorage,private router: Router,private toastr: ToastrService,public route: ActivatedRoute,private db: AngularFirestore) { }

  private oppId: string;
  
  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 5000);
    // this.ManageContentService.addOpportunity(this.addOpp);

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("oppId")) {
         this.mode = "edit";
        this.oppId = paramMap.get("oppId");
        // console.log(this.oppId);
         let opp = this.db.firestore.collection('opportunities').doc(this.oppId);
          opp.get().then((doc) => {
            if (doc.exists) {
             
              this.addOpp = {
                created_at:new Date().toLocaleString(),
                company:doc.data().company,
                title:doc.data().title,
                location:doc.data().location,
                core:doc.data().core,
                companyIndustry:doc.data().companyIndustry,
                type:doc.data().type,
                senioritylevel:doc.data().senioritylevel,
                description:doc.data().description,
                image:doc.data().image,
              }
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });              

      } else {
         this.mode = "create";
        this.oppId = null;
      }
    });

  }

  public onFileSelected(event) {
      this.selectedImage = event.target.files[0];
  }

  add(form: NgForm) {
    
    if (form.invalid) {
      return;
    }
    this.isLoader = true;
    
    // console.log(this.selectedImage);
    if (this.selectedImage == null) {
      this.addOpp = {
              created_at: new Date().toLocaleString(),
              company: form.value.company,
              title: form.value.title,
              location: form.value.location,
              core: form.value.core,
              companyIndustry: form.value.companyIndustry,
              type: form.value.type,
              senioritylevel: form.value.senioritylevel,
              description: form.value.description,
              image: this.addOpp.image
            }
          
            if (this.mode === "create") {
              this.ManageContentService.addOpportunity(this.addOpp);
              this.toastr.success('Opportunity addded sucessfully !!!');
              this.router.navigate(['/managecontent']);
            } else {
              this.ManageContentService.updateOpportunity(this.addOpp, this.oppId);
              this.toastr.success('Opportunity Updated sucessfully !!!');
              this.router.navigate(['/managecontent']);
            }
    } else {
       var path = 'opportunities/' + this.selectedImage.name;
  
      const ref = this.storage.ref(path);

      this.task = this.storage.upload(path, this.selectedImage);

      this.percentage = this.task.percentageChanges();

      this.task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            this.addOpp = {
              created_at: new Date().toLocaleString(),
              company: form.value.company,
              title: form.value.title,
              location: form.value.location,
              core: form.value.core,
              companyIndustry: form.value.companyIndustry,
              type: form.value.type,
              senioritylevel: form.value.senioritylevel,
              description: form.value.description,
              image: url
            }
          
            if (this.mode === "create") {
              this.ManageContentService.addOpportunity(this.addOpp);
              this.toastr.success('Opportunity addded sucessfully !!!');
              this.router.navigate(['/managecontent']);
            } else {
              this.ManageContentService.updateOpportunity(this.addOpp, this.oppId);
              this.toastr.success('Opportunity Updated sucessfully !!!');
              this.router.navigate(['/managecontent']);
            }
          });
        })
      ).subscribe();
    }
  }
}

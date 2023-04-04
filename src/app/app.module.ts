import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { NgxWigModule } from 'ngx-wig';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';


// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';

// fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { TopMenuComponent } from './menu/top-menu/top-menu.component';
import { SideMenuComponent } from './menu/side-menu/side-menu.component';
import { ManageContentDashboardComponent } from './manage-content/manage-content-dashboard/manage-content-dashboard.component';
import { AddOpportunitiesComponent } from './manage-content/add-opportunities/add-opportunities.component';
import { ShowallopportunitiesComponent } from './manage-content/showallopportunities/showallopportunities.component';
import { ShowalleventsComponent } from './manage-content/showallevents/showallevents.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ManageDashboardComponent } from './manage-user/manage-dashboard/manage-dashboard.component';
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component';
import { AlluserComponent } from './manage-user/alluser/alluser.component';

// Firebase credentials
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "saan-app",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#f5a623",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#f5a623",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#f5a623",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopMenuComponent,
    SideMenuComponent,
    ManageContentDashboardComponent,
    AddOpportunitiesComponent,
    ShowallopportunitiesComponent,
    ShowalleventsComponent,
    ManageDashboardComponent,
    ChangepasswordComponent,
    AlluserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxWigModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FullCalendarModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../home/user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-manage-dashboard',
  templateUrl: './manage-dashboard.component.html',
  styleUrls: ['./manage-dashboard.component.sass']
})
export class ManageDashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;

  public onlineUserChartOptions: any;
  public weeekOnlineUserChartOptions: any;
  public weeekNewUserChartOptions: any;

  public activeMemberData = [];
  public onlineUserData = [];
  public xaxis = [];
  public seriesChart = [];
  public weekxaxis = [];
  public weekseriesChart = [];
  public weekNewxaxis = [];
  public weekNewseriesChart = [];
  public todayOnlineCount = 0;
  public weekOnlineCount = 0;
  public weekNewCount = 0;
  public monthlyNewCount = 0;
  public monthlyActiveCount = 0;
  public todayOnline = [];
  public singleUserDetailsArray = [];
  private activeMemberDataSubs: Subscription;
  private onlineUserSubs: Subscription;
  objectKeys = Object.keys;
  private proId: string;
  private mode = 0;

  constructor(private toastr: ToastrService, private ngxService: NgxUiLoaderService, public UserService: UserService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.singleUserDetailsArray = [];

    this.getProfileByID();

    this.onlineUserChart(this.xaxis, this.seriesChart);
    this.weekOnlineUserChart(this.weekxaxis, this.weekseriesChart);
    this.weekNeweUserChart(this.weekNewxaxis,this.weekNewseriesChart);

    this.onlineUser();
    this.activeMember();

  }

  getProfileByID() {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 5000);

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("proId")) {
  
        this.proId = paramMap.get("proId");

        this.UserService.getProfileId(this.proId);
        this.UserService.getSingleUserData().subscribe(res => {
          this.mode = 1;
          this.pageLoadUserDetails(res);
        });

      } else {
        this.proId = null;
      }
    });
  }

    onlineUser() {
    const todayOnlineUser = [];
    var groupsOnlineUser = [];

    this.UserService.getOnlineUser();
    this.onlineUserSubs = this.UserService.getOnlineUserData().subscribe(data => {
     this.onlineUserData = data;
      this.onlineUserData.forEach(element => {

        // Online User
        var ts = element['last_online'];
        var today = new Date().setHours(0, 0, 0, 0);
        var thatDay = new Date(ts).setHours(0, 0, 0, 0);

        if (today === thatDay) {
          this.todayOnlineCount = this.todayOnlineCount + 1;
          
          const dateObject = new Date(ts);
          const dateFormat = dateObject.toLocaleString("en-US", { hour: "numeric" });

          todayOnlineUser.push(dateFormat);
        }

        // Current Week User
      });
      
      this.currentWeekUsers(this.onlineUserData);
       
        todayOnlineUser.forEach(function(val) {
          if (val in groupsOnlineUser) {
                groupsOnlineUser[val] = Number(groupsOnlineUser[val]) + 1;
          } else {
                groupsOnlineUser[val] = 1 ;                
            }
        });
      
      for (var x in groupsOnlineUser) {
          this.xaxis.push(x);
          this.seriesChart.push(groupsOnlineUser[x]);
        }
      
      // console.log(xaxis);
      
      this.onlineUserChart(this.xaxis,this.seriesChart);

    });
  }

  currentWeekUsers(currentWeekUsersData) {
    var weekOnlineUserArray = [];
    var groupsWeekUser = [];
    var now = new Date();
    var dayOfWeek = now.getDay(); //0-6
    var numDay = now.getDate();
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' }
    var start = new Date(now); //copy
    start.setDate(numDay - dayOfWeek);
    var thatStart = start.setHours(0, 0, 0, 0);
    var currentdate = new Date();
    var cur_month = currentdate.getMonth() + 1;
    var cur_year = currentdate.getFullYear();

    var end = new Date(now); //copy
    end.setDate(numDay + (7 - dayOfWeek));
    var thatEnd = end.setHours(0, 0, 0, 0);

    currentWeekUsersData.forEach(element => {
      var thatDay = new Date(element['last_online']).setHours(0, 0, 0, 0);

      const dateMonthlyObject = new Date(element['last_online']);
      const year = dateMonthlyObject.toLocaleString("en-US", { year: 'numeric' });
      const month = dateMonthlyObject.toLocaleString("en-US", { month: 'numeric' });

      if (cur_month == Number(month) && Number(year) == cur_year) {
        this.monthlyActiveCount = this.monthlyActiveCount + 1;
      }

      // console.log(thatDay);
        if (thatStart <= thatDay || thatDay >= thatEnd) {
          this.weekOnlineCount = this.weekOnlineCount + 1;
          var dateObject = new Date(element['last_online']);
          var dateFormat = dateObject.toLocaleString("en-US", options);
          
          weekOnlineUserArray.push(dateFormat);
        }
      // console.log(weekOnlineUserArray);
    }); 

    weekOnlineUserArray.forEach(function (Weekval) {
      // console.log(weekOnlineUserArray);      
      if (Weekval in groupsWeekUser) {
          //  console.log(Weekval)
           groupsWeekUser[Weekval] = Number(groupsWeekUser[Weekval]) + 1;
       } else {
        groupsWeekUser[Weekval] = 1;
      }
    });

    for (var x in groupsWeekUser) {
      this.weekxaxis.push(x);
      this.weekseriesChart.push(groupsWeekUser[x]);      
    }

    this.weekOnlineUserChart(this.weekxaxis,this.weekseriesChart);

  }

  activeMember() {    
    this.UserService.getActiveMembers();
    this.activeMemberDataSubs = this.UserService.getActiveMemberData().subscribe(data => {
      this.activeMemberData = data;
      if (this.mode == 0) {
        this.pageLoadUserDetails(this.activeMemberData);
      }

     this.weeklyNewUser(this.activeMemberData);
    });
  }


  pageLoadUserDetails(activeMemberData) {
    this.singleUserDetailsArray = [];
    if (this.mode == 0) {
      this.singleUserDetailsArray.push({ profile: activeMemberData[0].profile, id: activeMemberData[0].id, posts: activeMemberData[0].posts });
    } else {
     
      this.singleUserDetailsArray.push({ profile: activeMemberData[2], id: this.proId, posts: activeMemberData[1] });
     
      // console.log(this.singleUserDetailsArray);
    }
    
  }


  weeklyNewUser(activeMemberData){
    var weekNewUserArray = [];
    var groupsWeekUser = [];
    var now = new Date();
    var dayOfWeek = now.getDay(); //0-6
    var numDay = now.getDate();
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' }
    var currentdate = new Date();
    var cur_month = currentdate.getMonth() + 1;
    var cur_year = currentdate.getFullYear();
    
    var start = new Date(now); //copy
    start.setDate(numDay - dayOfWeek);
    var thatStart = start.setHours(0, 0, 0, 0);

    var end = new Date(now); //copy
    end.setDate(numDay + (7 - dayOfWeek));
    var thatEnd = end.setHours(0, 0, 0, 0);

    activeMemberData.forEach(element => {
      // console.log(element['profile']['created_at']);
      var thatDay = new Date(element['profile']['created_at']).setHours(0, 0, 0, 0);
      const dateMonthlyObject = new Date(element['profile']['created_at']);
      const year = dateMonthlyObject.toLocaleString("en-US", { year: 'numeric' });
      const month = dateMonthlyObject.toLocaleString("en-US", { month: 'numeric' });

      if (cur_month == Number(month) && Number(year) == cur_year) {
        this.monthlyNewCount = this.monthlyNewCount + 1;
      }

      if (thatStart <= thatDay || thatDay >= thatEnd) {
            var dateObject = new Date(element['profile']['created_at']);
            var dateFormat = dateObject.toLocaleString("en-US", options);
            weekNewUserArray.push(dateFormat);
      }
             
    }); 

    weekNewUserArray.forEach(function (Weekval) {
      // console.log(weekOnlineUserArray);
      if (Weekval in groupsWeekUser) {
          //  console.log(Weekval)
           groupsWeekUser[Weekval] = Number(groupsWeekUser[Weekval]) + 1;
       } else {
        groupsWeekUser[Weekval] = 1;
      }
    });

    for (var x in groupsWeekUser) {
      this.weekNewxaxis.push(x);
      this.weekNewseriesChart.push(groupsWeekUser[x]);
      this.weekNewCount = this.weekNewCount + Number(groupsWeekUser[x]);
    }
    //   console.log(this.weekNewxaxis);
    // console.log(this.weekNewseriesChart);
    this.weekNeweUserChart(this.weekNewxaxis,this.weekNewseriesChart);
  }
  
  onDeleteMember(id) {
    this.UserService.deleteProfile(id).subscribe(() => {
        this.toastr.success('Event Deleted sucessfully !!!');
        this.ngOnInit();  
   });        
  }

  ngOnDestroy(): void {
    this.activeMemberDataSubs.unsubscribe();
    this.onlineUserSubs.unsubscribe();
  }

  private onlineUserChart(xaxis,seriesChart) {
     this.onlineUserChartOptions = {
          series: [
            {
              name: "",
              data: seriesChart
            }
          ],
          chart: {
            height: 200,
            type: "area",
            zoom: {
              enabled: false
            }
          },
          stroke: {
            curve: 'straight'
          },
          xaxis: {
            categories: xaxis
          }
        };
  }

  private weekOnlineUserChart(xaxis,seriesChart) {
     this.weeekOnlineUserChartOptions = {
          series: [
            {
              name: "",
              data: seriesChart
            }
          ],
          chart: {
            height: 200,
            type: "area",
            zoom: {
              enabled: false
            }
          },
          colors:['#05e398'],
          stroke: {
            curve: 'straight'
          },
          xaxis: {
            categories: xaxis
        },
        };
  }

  private weekNeweUserChart(xNewaxis,seriesNewChart) {
     this.weeekNewUserChartOptions = {
          series: [
            {
              name: "",
              data: seriesNewChart
            }
          ],
          chart: {
            height: 200,
            type: "area",
            zoom: {
              enabled: false
            }
          },
          colors:['#02d0d0'],
          stroke: {
            curve: 'straight'
          },
          xaxis: {
            categories: xNewaxis
        },
        };
  }

}

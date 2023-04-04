import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private activeMembersData = new Subject<any>();
  private onlineUserData = new Subject<any>();
  private getSingleProfileData = new Subject<any>();

  constructor(private storage: AngularFireStorage,private db: AngularFirestore,private http: HttpClient) { }

  getActiveMemberData() {
    return this.activeMembersData.asObservable();
  }
  getOnlineUserData() {
    return this.onlineUserData.asObservable();
  }
  getSingleUserData() {
    return this.getSingleProfileData.asObservable();
  }

  getOnlineUser() {
 
   
    this.http.get('https://saan-app.firebaseio.com/online.json')
      .pipe(map(resData => {

        const opactiveMembersArray: any = [];

        for (const key in resData) {
          if(resData.hasOwnProperty(key)){
            opactiveMembersArray.push({ ...resData[key], id: key });
          }
        }       

        return opactiveMembersArray;
      })).subscribe(res => {     
 
     res.sort(function(x, y){
        return x.last_online - y.last_online;
    })   

     this.onlineUserData.next(res);
    });    
  }

  getActiveMembers() {
    let opactiveMembersArray: any = [];
    
    this.http.get('https://saan-app.firebaseio.com/users.json')
      .pipe(map(resData => {

        const opactiveMembersArray: any = [];

        for (const key in resData) {
          if(resData.hasOwnProperty(key)){
            opactiveMembersArray.push({ ...resData[key], id: key });
          }
        }       

        return opactiveMembersArray;
      })).subscribe(res => {     
 
      res.sort(function (x, y) {
        return x.profile.created_at - y.profile.created_at;
      })   

      // console.log(res);   
        
     this.activeMembersData.next(res);
    }); 

  }

  deleteProfile(id) {
    return this.http.delete('https://saan-app.firebaseio.com/users/'+id+'.json');
  }

  getProfileId(id) {
    let opactiveMembersArray: any = [];
    
    this.http.get('https://saan-app.firebaseio.com/users/'+id+'.json')
      .pipe(map(resData => {

        const opactiveMembersArray: any = [];

        for (const key in resData) {
          if(resData.hasOwnProperty(key)){
            opactiveMembersArray.push({ ...resData[key], id: key });
          }
        }       

        return opactiveMembersArray;
      })).subscribe(res => {     


      this.getSingleProfileData.next(res);
        
    }); 

  }




}

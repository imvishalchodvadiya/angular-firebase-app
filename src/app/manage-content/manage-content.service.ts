import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Opportunity } from './opportunity.model';
import { Events } from './event.model';
import { Router } from '@angular/router';
import { Observable, pipe, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ManageContentService {

  constructor(private storage: AngularFireStorage,private db: AngularFirestore,private router: Router) { }
  
  private opportunityData = new Subject<boolean>();
  private opportunitySingleData = new Subject();
  private eventData = new Subject<boolean>();


  addOpportunity(opportunity: Opportunity) {
   return this.db.collection('opportunities').add(opportunity);  
  }

   updateOpportunity(opportunity: Opportunity,id) {
   return this.db.collection('opportunities').doc(id).update(opportunity);  
  }

  getOpportunityData() {
    return this.opportunityData.asObservable();
  }

  getOpportunitySignleData() {
    return this.opportunitySingleData.asObservable();
  }

  getOpportunity() {
    
    let opportunityArray: any = [];
    
    let opp = this.db.firestore.collection(`opportunities`);
    opp.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        opportunityArray.push({ 'id': doc.id, 'data': doc.data() });
      });
       this.opportunityData.next(opportunityArray);
    });
  }

   getSingleOpportunity(oppId: string) {    
     
     let opp = this.db.firestore.collection('opportunities').doc(oppId);
      opp.get().then(function(doc) {
        if (doc.exists) {
          // return doc.data();
          return doc.data();
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  addEventCall(event: Events) {
   return this.db.collection('event').add(event);  
  }

  getEventData() {
    return this.eventData.asObservable();
  }

  getEvent() {
    
    let eventArray: any = [];
    
    let opp = this.db.firestore.collection(`event`);
    opp.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        eventArray.push({ 'id': doc.id, 'data': doc.data() });
      });
       this.eventData.next(eventArray);
    });
  }

}

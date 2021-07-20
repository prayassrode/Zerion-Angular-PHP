import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { Record } from './record.model';

@Injectable({ providedIn: 'root' })
export class RecordService {
    private records: Record[] = [];
    private recordsUpdated = new Subject<Record[]>();

    constructor(private http: HttpClient, private router: Router) {}

    getRecordData() {
        let params = new HttpParams();
        let headers = new HttpHeaders().set('Access-Control-Allow-Origin', 'http://localhost:4200');
      
        this.http.get('http://localhost:4200/getToken', {params, headers}).subscribe((data:any) => {
          let token = data.accessToken;
          this.http.get('http://localhost:4200/getRecord?token='+token+"&fields=first_name,last_name" , {params, headers}).subscribe((recordData:any) => {
            // console.log("Record:"+ JSON.stringify(recordData));
            this.records = recordData;
            this.recordsUpdated.next([...this.records]);
          },
          err => {
            window.alert("Something went wrong. Please try again.");
          }
          );
        },
        err => {
            window.alert("Something went wrong. Please try again.");
        }
        );
    }


    postRecord(req: any){
       //  var auth = 'Bearer ' + this.req.accessToken;
      let params = new HttpParams();
      let headers = new HttpHeaders().set('Access-Control-Allow-Origin', 'http://localhost:4200');
    
      this.http.get('http://localhost:4200/getToken', {params, headers}).subscribe((data:any) => {
        let token = data.accessToken;
        req.accessToken = token;
        this.http.post('http://localhost:4200/postFormData', req).subscribe((postData:any) => {
            // return data.accessToken;
            console.log("PostData: "+postData);
            window.alert("Data added Successfully!");
            this.router.navigate(['records']);
         },
         err => {
            window.alert("Something went wrong. Please try again.")
         }
         );
      },
      err => {
          window.alert("Something went wrong. Please try again.");
      }
      );
     
    }

    getRecordUpdateListener() {
        return this.recordsUpdated.asObservable();
    }
     

}
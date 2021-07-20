import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  result!: Observable<any>;
  req : any;
  profileForm: FormGroup;
  token: any;
  records: any;
  showForm: boolean;
  buttonName: String;
  isLoading: boolean;

 constructor(private formBuilder:FormBuilder, 
            private http : HttpClient,
            private recordService : RecordService,
            private router: Router){

  this.profileForm = this.formBuilder.group({
    first_name:['', Validators.required],
    last_name:['', Validators.required],
  });

  this.req = {};
  this.showForm = true;
  this.buttonName = "Show Records";
  this.isLoading = false;
}

ngOnInit(): void {
  this.isLoading = false;
}

 saveForm(){   
   let body:any = {};
   let fields:any = [];
   this.isLoading = true;
   Object.keys(this.profileForm.controls).forEach(key => {
    let prop:any = {};
    prop.element_name = key;
    prop.value =  this.profileForm.get(key)?.value;
    fields.push(prop);
    this.isLoading = false;
  });
  body.fields = fields;

  this.req.body = body;
  this.recordService.postRecord(this.req);
 }

 onSubmit() {
  let params = new HttpParams();
  let headers = new HttpHeaders().set('Access-Control-Allow-Origin', 'http://localhost:4200');
   this.http.get('http://localhost:4200/getToken', {params, headers}).subscribe((data:any) => {
      this.token = data.accessToken;
      this.req.accessToken = data.accessToken;
      this.saveForm();
    });
 }

 navigateToRecords() {
  this.router.navigate(['records']);
 }

}
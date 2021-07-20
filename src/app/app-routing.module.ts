import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecordComponent } from './add-record/add-record.component';
import { GetRecordsComponent } from './get-records/get-records.component';

const routes: Routes = [
  { path: '', component: AddRecordComponent },
  { path: 'records', component: GetRecordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

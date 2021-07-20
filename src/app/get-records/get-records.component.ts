import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Record } from '../record.model';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-get-records',
  templateUrl: './get-records.component.html',
  styleUrls: ['./get-records.component.css']
})
export class GetRecordsComponent implements OnInit {

  records: Record[] = [];
  isLoading = false;
  recordSub!: Subscription;

  constructor(public recordService: RecordService,
    private router: Router) {}

  ngOnInit(): void {
    this.recordService.getRecordData();
    this.recordSub = this.recordService.getRecordUpdateListener()
      .subscribe((records: Record[]) => {
        this.records = records;
    });
  }

  ngOnDestroy() {
    this.recordSub.unsubscribe();
  }

  navigateToRecords() {
    this.router.navigate(['/']);
  }

}

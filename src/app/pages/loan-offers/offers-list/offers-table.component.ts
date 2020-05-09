import {Component, OnDestroy, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import {LoanOffer, SmartTableService} from '../../../@core/mock/smart-table.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngx-offers-list',
  templateUrl: './offers-table.component.html',
  styleUrls: ['./offers-table.component.scss'],
})
export class OffersTableComponent implements OnInit, OnDestroy {

  offers: LoanOffer[];

  settings = {
    actions: {
      add: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        editable: false,
      },
      amount: {
        title: 'Amount',
        type: 'number',
      },
      creditScore: {
        title: 'Minimum Score',
        type: 'number',
      },
      interestRate: {
        title: 'Interest',
        type: 'number',
      },
      repayPeriod: {
        title: 'Repayment Period(days)',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  private process: Subscription;

  constructor( private fs: SmartTableService) {
    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit(): void {
    this.process = this.fs.getData().subscribe(res => {
      this.source = new LocalDataSource(res);
    });
  }

  ngOnDestroy() {
    this.process.unsubscribe();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}

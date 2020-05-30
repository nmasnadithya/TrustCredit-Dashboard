import {Component, OnDestroy, OnInit} from '@angular/core';

import {Loan} from '../../../@core/mock/loan-offer-table.service';
import {Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirebaseDataSource} from '../../../@core/mock/FirebaseDataSource';

@Component({
  selector: 'ngx-offers-list',
  templateUrl: './loans-table.component.html',
  styleUrls: ['./loans-table.component.scss'],
})
export class LoansTableComponent implements OnInit, OnDestroy {

  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
      custom: [
        {
          name: 'issue',
          title: '<div class="hover-blue"><i class="nb-maximize"></i><span class="custom-action-text">Issue</span></div>',
        },
        {
          name: 'settle',
          title: '<div class="hover-green"><i class="nb-minimize"></i><span class="custom-action-text">Settled</span></div>',
        },
      ],
    },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        editable: false,
      },
      offerId: {
        title: 'Loan Offer',
        type: 'string',
        editable: false,
      },
      amount: {
        title: 'Amount',
        type: 'number',
        editable: false,
      },
      interestRate: {
        title: 'Interest',
        type: 'number',
        editable: false,
      },
      repayPeriod: {
        title: 'Repayment Period(days)',
        type: 'number',
        editable: false,
      },
      description: {
        title: 'Description',
        type: 'string',
        editable: false,
      },
      user: {
        title: 'User ID',
        type: 'string',
        editable: false,
      },
      userName: {
        title: 'User Full Name',
        type: 'string',
        editable: false,
      },
      userNic: {
        title: 'User NIC',
        type: 'string',
        editable: false,
      },
      userBank: {
        title: 'User Bank',
        type: 'string',
        editable: false,
      },
      userBranch: {
        title: 'User Bank Branch',
        type: 'string',
        editable: false,
      },
      userAccountNo: {
        title: 'User Account No.',
        type: 'string',
        editable: false,
      },
      loanRequested: {
        title: 'Loan Requested',
        type: 'string',
        editable: false,
      },
      loanIssued: {
        title: 'Loan Issued',
        type: 'string',
        editable: false,
      },
      loanSettled: {
        title: 'Loan Settled',
        type: 'string',
        editable: false,
      },
    },
  };

  source: FirebaseDataSource;
  private process: Subscription;

  constructor(private afs: AngularFirestore) {
    this.source = new FirebaseDataSource(afs.collection<Loan>('Loans'));
    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit(): void {
    // this.process = this.fs.getData().subscribe(res => {
    //   this.source = new LocalDataSource(res);
    // });
  }

  ngOnDestroy() {
    // this.process.unsubscribe();
  }

  onCustomAction(event): void {
    if (event.action === 'issue' && event.data.loanIssued) {
      window.alert('Loan already issued!');
      return;
    }
    if (event.action === 'settle' && event.data.loanSettled) {
      window.alert('Loan already settled !');
      return;
    }
    if (event.action === 'settle' && !event.data.loanIssued) {
      window.alert('Loan not issued!');
      return;
    }
    if (event.action === 'issue') {
      event.source.issueLoan(event.data);
      return;
    }
    if (event.action === 'settle') {
      event.source.settleLoan(event.data);
      return;
    }
  }
}

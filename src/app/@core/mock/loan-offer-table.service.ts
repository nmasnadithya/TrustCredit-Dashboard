import {Injectable} from '@angular/core';
import {SmartTableData} from '../data/smart-table';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface LoanOffer {
  id?: string;
  amount: number;
  bank: string;
  bankImage: string;
  creditScore: number;
  description: string;
  interestRate: number;
  repayPeriod: number;
  email: string;
}

export interface Loan extends LoanOffer {
  loanRequested: Date;
  loanIssued?: Date;
  loanSettled?: Date;
  user: string;
  userName: string;
  userNic: string;
  userBank: string;
  userBranch: string;
  userAccountNo: string;
  offerId: string;
}

@Injectable()
export class LoanOfferTableService extends SmartTableData {

  public offers: Observable<LoanOffer[]>;
  private loanOffersCollection: AngularFirestoreCollection<LoanOffer>;

  constructor(afs: AngularFirestore) {
    super();
    this.loanOffersCollection = afs.collection<LoanOffer>('LoanOffers');
    this.offers = this.loanOffersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return {id: a.payload.doc.id, ...data};
        });
      }),
    );
  }

  getData() {
    return this.offers;
  }

  update(item: LoanOffer) {
    const {id, ...data} = item;
    this.loanOffersCollection.doc(item.id).update(data);
  }
}

import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalDataSource} from 'ng2-smart-table';

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

@Injectable()
export class SmartTableService extends SmartTableData {

  private loanOffersCollection: AngularFirestoreCollection<LoanOffer>;
  public offers: Observable<LoanOffer[]>;

  constructor(private afs: AngularFirestore) {
    super();
    this.loanOffersCollection = afs.collection<LoanOffer>('LoanOffers');
    this.offers = this.loanOffersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      }),
    );
  }

  getData() {
    return this.offers;
  }
}

// export class LoanOfferDataSource extends LocalDataSource {
//
//   remove(element: any): Promise<any> {
//
//     return super.remove(element);
//   }
// }

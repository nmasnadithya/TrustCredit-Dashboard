import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoanOffer} from '../../../@core/mock/smart-table.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Component({
  selector: 'ngx-offers-form',
  styleUrls: ['./offers-form.component.scss'],
  templateUrl: './offers-form.component.html',
})
export class OffersFormComponent implements OnInit {

  loanOfferForm;
  private loanOffersCollection: AngularFirestoreCollection<LoanOffer>;

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore) {
    this.loanOfferForm = this.formBuilder.group({
      amount: 0,
      minimumScore: 0,
      interest: 0,
      repayPeriod: 0,
      description: '',
    });
    this.loanOffersCollection = afs.collection<LoanOffer>('LoanOffers');
  }

  ngOnInit(): void {
  }

  onSubmit(offerData) {
    console.log(offerData);
    this.loanOffersCollection.add({
      bank: 'People\'s Micro Credit',
      bankImage: 'https://firebasestorage.googleapis.com/v0/b/trust-credit.appspot.com/o/banks%2Flogos%2FPeople_s_micro_credit.png?alt=media&token=7c12d60c-75f2-4358-b3ff-a6747877eebf',
      creditScore: offerData.minimumScore,
      description: offerData.description,
      email: 'iframismath@gmail.com',
      interestRate: offerData.interest,
      repayPeriod: offerData.repayPeriod,
      amount: offerData.amount,
    });
    this.loanOfferForm.reset();
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanOffersComponent } from './loan-offers.component';
import { OffersTableComponent } from './offers-list/offers-table.component';
import {OffersFormComponent} from './offers-add/offers-form.component';

const routes: Routes = [{
  path: '',
  component: LoanOffersComponent,
  children: [
    {
      path: 'list',
      component: OffersTableComponent,
    },
    {
      path: 'add',
      component: OffersFormComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanOffersRoutingModule { }

export const routedComponents = [
  LoanOffersComponent,
  OffersTableComponent,
  OffersFormComponent,
];

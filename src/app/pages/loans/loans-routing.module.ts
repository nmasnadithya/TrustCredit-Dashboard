import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoansComponent } from './loans.component';
import { LoansTableComponent } from './loans-list/loans-table.component';

const routes: Routes = [{
  path: '',
  component: LoansComponent,
  children: [
    {
      path: 'list',
      component: LoansTableComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoansRoutingModule { }

export const routedComponents = [
  LoansComponent,
  LoansTableComponent,
];

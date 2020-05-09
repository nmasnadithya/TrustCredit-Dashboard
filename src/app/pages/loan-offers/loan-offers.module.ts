import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbDatepickerModule,
  NbIconModule,
  NbInputModule, NbRadioModule, NbSelectModule,
  NbTreeGridModule, NbUserModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { LoanOffersRoutingModule, routedComponents } from './loan-offers-routing.module';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        ThemeModule,
        NbInputModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbUserModule,
        NbCheckboxModule,
        NbRadioModule,
        NbDatepickerModule,
        NbSelectModule,
        NbIconModule,
        LoanOffersRoutingModule,
        Ng2SmartTableModule,
        ngFormsModule,
        ReactiveFormsModule,
    ],
  declarations: [
    ...routedComponents,
  ],
})
export class LoanOffersModule { }

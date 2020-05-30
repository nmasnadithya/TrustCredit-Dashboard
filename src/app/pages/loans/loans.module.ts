import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbDatepickerModule,
  NbIconModule,
  NbInputModule, NbRadioModule, NbSelectModule, NbUserModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { LoansRoutingModule, routedComponents } from './loans-routing.module';

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
        LoansRoutingModule,
        Ng2SmartTableModule,
    ],
  declarations: [
    ...routedComponents,
  ],
})
export class LoansModule { }

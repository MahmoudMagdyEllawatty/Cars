import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminOrdersPageRoutingModule } from './admin-orders-routing.module';

import { AdminOrdersPage } from './admin-orders.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminOrdersPageRoutingModule,
      TranslateModule
  ],
  declarations: [AdminOrdersPage]
})
export class AdminOrdersPageModule {}

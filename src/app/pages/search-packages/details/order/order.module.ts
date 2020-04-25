import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { OrderPage } from './order.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
      TranslateModule,
    NgxIonicImageViewerModule
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}

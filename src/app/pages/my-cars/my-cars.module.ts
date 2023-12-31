import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCarsPageRoutingModule } from './my-cars-routing.module';

import { MyCarsPage } from './my-cars.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCarsPageRoutingModule,
    TranslateModule
  ],
  declarations: [MyCarsPage]
})
export class MyCarsPageModule {}

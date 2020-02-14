import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateServicePageRoutingModule } from './update-service-routing.module';

import { UpdateServicePage } from './update-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateServicePageRoutingModule
  ],
  declarations: [UpdateServicePage]
})
export class UpdateServicePageModule {}

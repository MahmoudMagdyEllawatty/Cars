import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPackagesPageRoutingModule } from './search-packages-routing.module';

import { SearchPackagesPage } from './search-packages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPackagesPageRoutingModule
  ],
  declarations: [SearchPackagesPage]
})
export class SearchPackagesPageModule {}

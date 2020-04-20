import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPackagesPageRoutingModule } from './search-packages-routing.module';

import { SearchPackagesPage } from './search-packages.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPackagesPageRoutingModule,
      TranslateModule
  ],
  declarations: [SearchPackagesPage]
})
export class SearchPackagesPageModule {}

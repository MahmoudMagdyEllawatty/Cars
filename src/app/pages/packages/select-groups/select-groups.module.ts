import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectGroupsPageRoutingModule } from './select-groups-routing.module';

import { SelectGroupsPage } from './select-groups.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectGroupsPageRoutingModule,
      TranslateModule
  ],
  declarations: [SelectGroupsPage]
})
export class SelectGroupsPageModule {}

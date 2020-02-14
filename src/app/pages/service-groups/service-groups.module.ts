import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceGroupsPageRoutingModule } from './service-groups-routing.module';

import { ServiceGroupsPage } from './service-groups.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ServiceGroupsPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ServiceGroupsPage]
})
export class ServiceGroupsPageModule {}

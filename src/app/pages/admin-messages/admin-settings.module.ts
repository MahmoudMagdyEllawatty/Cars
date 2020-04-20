import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSettingsPageRoutingModule } from './admin-settings-routing.module';

import { AdminSettingsPage } from './admin-settings.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminSettingsPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [AdminSettingsPage]
})
export class AdminSettingsPageModule {}

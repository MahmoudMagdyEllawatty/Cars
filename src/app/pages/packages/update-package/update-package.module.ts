import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePackagePageRoutingModule } from './update-package-routing.module';

import { UpdatePackagePage } from './update-package.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePackagePageRoutingModule,
      TranslateModule
  ],
  declarations: [UpdatePackagePage]
})
export class UpdatePackagePageModule {}

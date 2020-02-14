import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPackagePageRoutingModule } from './add-package-routing.module';

import { AddPackagePage } from './add-package.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddPackagePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AddPackagePage]
})
export class AddPackagePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Step2PageRoutingModule } from './step2-routing.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { Step2Page } from './step2.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step2PageRoutingModule,
      TranslateModule,
    NgxIonicImageViewerModule
  ],
  declarations: [Step2Page]
})
export class Step2PageModule {}

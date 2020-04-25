import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Step3PageRoutingModule } from './step3-routing.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { Step3Page } from './step3.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step3PageRoutingModule,
      TranslateModule,
    NgxIonicImageViewerModule
  ],
  declarations: [Step3Page]
})
export class Step3PageModule {}

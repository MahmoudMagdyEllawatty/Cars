import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsPageRoutingModule } from './reviews-routing.module';

import { ReviewsPage } from './reviews.page';
import {TranslateModule} from '@ngx-translate/core';
import {IonicRatingModule} from 'ionic4-rating/dist';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ReactiveFormsModule,
    IonicRatingModule,
    ReviewsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ReviewsPage]
})
export class ReviewsPageModule {}

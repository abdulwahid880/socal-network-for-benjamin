import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedRouteModule } from './route/feed-route/feed-route.module';
import { FeedListingComponent } from './components/feed-listing/feed-listing.component';
import { AddFeedComponent } from './components/add-feed/add-feed.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@app/@shared';

import { FlexLayoutModule } from '@angular/flex-layout';
import {  MatButtonModule } from '@angular/material/button';
import { FeedHeaderComponent } from './components/feed-listing/sections/feed-header/feed-header.component';
import { FeedFooterComponent } from './components/feed-listing/sections/feed-footer/feed-footer.component';
import { FeedContentComponent } from './components/feed-listing/sections/feed-content/feed-content.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [FeedListingComponent, AddFeedComponent, FeedHeaderComponent, FeedFooterComponent, FeedContentComponent],
  imports: [
    CommonModule,
    RouterModule,
    FeedRouteModule,
    SharedModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    InfiniteScrollModule,
    NgxSpinnerModule

  ]
})
export class FeedsModule { }

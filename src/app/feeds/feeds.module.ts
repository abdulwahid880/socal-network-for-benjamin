import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedRouteModule } from './route/feed-route/feed-route.module';
import { FeedListingComponent } from './components/feed-listing/feed-listing.component';
import { AddFeedComponent } from './components/add-feed/add-feed.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FeedListingComponent, AddFeedComponent],
  imports: [
    CommonModule,
    RouterModule,
    FeedRouteModule
  ]
})
export class FeedsModule { }

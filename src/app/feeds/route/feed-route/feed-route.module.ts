import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { AddFeedComponent } from '@app/feeds/components/add-feed/add-feed.component';
import { FeedListingComponent } from '@app/feeds/components/feed-listing/feed-listing.component';

const routes: Routes = [

      // { path: '', redirectTo: '/staff', pathMatch: 'full' },
      {
        path: '',
        component: AddFeedComponent,
      
       
      },
      {
        path: 'feed-listing',
        component: FeedListingComponent,
      
       
      },

   
    
    
  ];
  @NgModule({
    imports: [CommonModule,RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
  })
export class FeedRouteModule { }

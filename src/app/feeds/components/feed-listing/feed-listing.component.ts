import {  ScrollDispatcher } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FeedsService } from '@app/feeds/service/feeds.service';

@Component({
  selector: 'app-feed-listing',
  templateUrl: './feed-listing.component.html',
  styleUrls: ['./feed-listing.component.scss']
})

export class FeedListingComponent implements OnInit {

    disabled : boolean = true;
    feeds:any;
    array:any = [];
    sum = 2;
    throttle = 100;
    scrollDistance = 1;
    scrollUpDistance = 2;
    direction = '';
    modalOpen = false;

  ngOnInit(): void {
   this.getFeeds();
  }
  getFeeds(){
   this.FeedsService.getRanddomFeeds(this.sum).subscribe((response:any)=>{
       this.feeds=response.results;
   })
  }
  constructor(public sd: ScrollDispatcher,private FeedsService:FeedsService) {
   
  
  
  }
 
  
  addItems(startIndex:Number, endIndex:Number, _method:any) {
    const temp = [];
    for (let i = 0; i < this.sum; ++i) {
      temp.push([i, ' ', this.generateWord()].join(''));
    }
    this.array = [...temp];
  }
  
  appendItems(startIndex:Number, endIndex:Number) {
    this.addItems(startIndex, endIndex, 'push');
  }
  
  prependItems(startIndex:Number, endIndex:Number) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  onScrollDown (ev:any) {
   this.add()
  }
  
  add(total = 2) {
    const start = this.sum;
    this.sum += total;
    this.appendItems(start, this.sum);
    this.direction = 'down'
    this.getFeeds()
  }

  onUp(ev:any) {
    console.log('scrolled up!', ev);
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);
  
    this.direction = 'up';
  }
  generateWord() {
 
  }

  
}
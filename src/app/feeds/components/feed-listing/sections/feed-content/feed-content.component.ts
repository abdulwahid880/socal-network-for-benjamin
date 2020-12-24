import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-content',
  templateUrl: './feed-content.component.html',
  styleUrls: ['./feed-content.component.scss']
})
export class FeedContentComponent implements OnInit {
   
   @Input() feedImage:any;
  constructor() { }

  ngOnInit(): void {
  }

}

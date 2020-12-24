import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-header',
  templateUrl: './feed-header.component.html',
  styleUrls: ['./feed-header.component.scss']
})
export class FeedHeaderComponent implements OnInit {
@Input() userDetail:any;
  constructor() { }


  ngOnInit(): void {
      
  }

}

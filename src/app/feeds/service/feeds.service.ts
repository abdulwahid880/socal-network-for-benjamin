import { Injectable } from '@angular/core';
import { ApiHelperService } from '@app/@core/services/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  constructor(private apiHelper:ApiHelperService) { }
  getRanddomFeeds(numberOfFeed:Number){
     return this.apiHelper.getByQueryString(`api/?page=1&results=${numberOfFeed}&seed=feed`);
  }
}

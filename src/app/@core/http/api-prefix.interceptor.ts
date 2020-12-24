import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '@env/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, map } from 'rxjs/operators';
/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {
constructor(private spinner:NgxSpinnerService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.spinner.show();
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.baseUrl + request.url });
    }
    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.spinner.hide();
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            
                this.spinner.hide();

             
             

            return throwError(error);
        })
    );
  }
}

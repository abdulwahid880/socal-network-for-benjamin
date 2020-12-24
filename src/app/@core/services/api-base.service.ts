import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ApiHelperService {
    protected baseUrl = '';
    protected cdnBaseUrl = '';
    private httpRequestThrottler: HttpRequestThrottler;

    constructor(private readonly http: HttpClient,public router:Router) {
        this.httpRequestThrottler = new HttpRequestThrottler();
        this.baseUrl = environment.baseUrl;
      
    }

    public getAll<T>(
        endpoint: string,
        pageSize: number,
        pageNo: number = 1,
        disableMultipleRequests: boolean = false,
    ): Observable<T> {
        if (disableMultipleRequests && this.httpRequestThrottler.blockRequest(endpoint)) {
            return empty();
        }

        const params = new HttpParams().set('pageNo', pageNo.toString()).set('pageSize', pageSize.toString());

        const url = this.baseUrl + endpoint;

        return this.http.get(url, { params: params }).pipe(
            catchError((err) => {
                return this.handleErrorResponse(err, endpoint);
            }),
            map((response: T) => {
                return this.trimResponse(response, endpoint) as T;
            })
        );
    }

    public getByQueryString<T>(
        endpoint: string,
        disableMultipleRequests: boolean = false,
    ): Observable<T> {
        if (disableMultipleRequests && this.httpRequestThrottler.blockRequest(endpoint)) {
            return empty();
        }

        const url = this.baseUrl + endpoint;

        return this.http.get(url).pipe(
            catchError((err) => {
                return this.handleErrorResponse(err, endpoint);
            }),
            map((response: T) => {
                return this.trimResponse(response, endpoint) as T;
            })
        );
    }

    public get<T>(id: any, endpoint: string, disableMultipleRequests: boolean = false): Observable<T> {
        if (disableMultipleRequests && this.httpRequestThrottler.blockRequest(endpoint)) {
            return empty();
        }

        const url = this.createUrl(endpoint, id);
        return this.http.get(url).pipe(
            catchError((err: any) => {
                return this.handleErrorResponse(err, endpoint);
            }),
            map((response: T) => {
                return this.trimResponse(response, endpoint) as T;
            })
        );
    }

    public getFileStream(id: any, endpoint: string, disableMultipleRequests: boolean = false){
        if (disableMultipleRequests && this.httpRequestThrottler.blockRequest(endpoint)) {
            return empty();
        }

        const url = this.createUrl(endpoint, id);
        let response = this.http.get(url, { observe: 'response', responseType: 'blob' as 'json' }).pipe(
            catchError((err: any) => {
                return this.handleErrorResponse(err, endpoint);
            },
                ),
        );
        return response;
    }


    public put<TInput, TOutput>(
        model: TInput,
        params: HttpParams,
        endpoint: string,
        disableMultipleRequests: boolean = true
    ): Observable<TOutput> {
        if (disableMultipleRequests && this.httpRequestThrottler.blockRequest(endpoint)) {
            return empty();
        }

        const url = this.createUrl(endpoint, null);

        return this.http.put(url, model, { params: params }).pipe(
            catchError((err: any) => {
                return this.handleErrorResponse(err, endpoint);
            }),
            map((response: any) => {
                return this.trimResponse(response, endpoint) as TOutput;
            })
        );
    }

    public post<TInput, TOutput>(model: TInput, endpoint: string, disableMultipleRequests: boolean = true): Observable<TOutput> {
        if (disableMultipleRequests && this.httpRequestThrottler.blockRequest(endpoint)) {
            return empty();
        }

        const url = this.createUrl(endpoint, null);

        return this.http
            .post(url, model)
            .pipe(
                catchError((resp: HttpErrorResponse) => {
                    return this.handleErrorResponse(resp, endpoint);
                })
            )
            .pipe(
                map((response: any) => {
                    return this.trimResponse(response, endpoint) as TOutput;
                })
            );
    }

    public search<TInput, TOutput>(
        model: TInput,
        endpoint: string,
        pageSize: number,
        pageNo: number = 1,
        disableMultipleRequests: boolean = true): Observable<TOutput> {
        if (disableMultipleRequests && this.httpRequestThrottler.blockRequest(endpoint)) {
            return empty();
        }
        let searchEndpoint = `${endpoint}?pageNo=${pageNo}&pageSize=${pageSize}`;
        const url = this.createUrl(searchEndpoint, null);

        return this.http
            .post(url, model)
            .pipe(
                catchError((resp: HttpErrorResponse) => {
                    return this.handleErrorResponse(resp, endpoint);
                })
            )
            .pipe(
                map((response: any) => {
                    return this.trimResponse(response, endpoint) as TOutput;
                })
            );
    }

    // Handle API errors
    private handleErrorResponse(error: HttpErrorResponse, endpoint: string) {
        
        this.httpRequestThrottler.unblockRequest(endpoint);
         

        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
         
            if(error.status==401){
                this.router.navigate(['login'])
            }
            
            return throwError (error);
        }
        return empty();
    }

    public postWithFile(formData: FormData, endpoint: string): Observable<any> {
        const url = this.createUrl(endpoint, null);
        return this.http.post(url, formData).pipe(
            catchError((resp: HttpErrorResponse) => {
                return this.handleErrorResponse(resp, endpoint);
            })
        )
            .pipe(
                map((response: any) => {
                    return this.trimResponse(response, endpoint);
                })
            );;
    }

    public delete<T>(id: any, endpoint: string): Observable<T> {
        const url = this.createUrl(endpoint, id);
        return this.http.delete(url).pipe(
            catchError((resp: any) => {
                this.handleErrorResponse(resp, endpoint);
                return throwError(resp.error);
            }),
            map((response: any) => {
                return this.trimResponse(response, endpoint) as T;
            })
        );
    }

    private createUrl(endpoint: string, id: any): string {
        const lastCharBaseUrl = this.baseUrl.substring(this.baseUrl.length - 1, this.baseUrl.length);
        const firstCharEndPoint = endpoint.substring(0, 1);
        const endpointSubString = endpoint.substring(1, endpoint.length);

        if (lastCharBaseUrl === '/' && firstCharEndPoint === '/') {
            this.baseUrl = this.baseUrl;
            endpoint = endpointSubString;
        }

        return id === null ? `${this.baseUrl}${endpoint}` : `${this.baseUrl}${endpoint}/${id}`;
    }

    private trimResponse(response: any, endPoint: string, showMessage = false) {
        this.httpRequestThrottler.unblockRequest(endPoint);
        //const data = response.json();
        const data = response;
        if (showMessage && data.messages && data.messages.length > 0) {
        }

        return data;
    }

}

class HttpRequestThrottler {
    private httpRequestsInProgress: HttpCall[];

    constructor() {
        this.httpRequestsInProgress = [];
    }

    blockRequest(url: string): boolean {
        const req = this.httpRequestsInProgress.find((x) => x.url === url);

        if (req && req.elapsedSeconds() <= 10) {
            console.log(`Blocked duplicate call for url: ${url}`);
            return true;
        }
        this.httpRequestsInProgress = this.httpRequestsInProgress.filter((x) => x.url !== url);
        this.httpRequestsInProgress.push(new HttpCall(url));
        return false;
    }

    unblockRequest(url: string): void {
        this.httpRequestsInProgress = this.httpRequestsInProgress.filter((x) => x.url !== url);
    }
}

class HttpCall {
    constructor(url: string) {
        this.url = url;
        this.timestamp = new Date();
    }

    url: string;
    timestamp: Date;
    elapsedSeconds(): number {
        return (new Date().getTime() - this.timestamp.getTime()) / 1000;
    }
}

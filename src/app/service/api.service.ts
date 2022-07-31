import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { NewsApiService } from 'angular-news-api';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiBaseUrl = environment.apiBaseUrl;
  getTotalApiBaseUrlWorlMeter = environment.totalWorldMeterApiBaseUrl;
  getAllCountriesApiBaseUrlWorlMeter = environment.allCountriesWorldMeterApiBaseUrl;
  googleUrl = environment.news.google;
  mediaStackUrl = environment.news.mediastack;

  constructor(private http: HttpClient, private loaderService: LoaderService, private router: Router, private newsApiService: NewsApiService) { }



  /** GET data from the server */
getAllData(): Observable<any> {
  this.loaderService.showLoader();

  return this.http.get<any>(this._getJsonFormatUrl())
    .pipe(
      tap(_ => {
        console.log('fetched data: ', _.data.length);
        this.loaderService.hideLoader();
      }),
      catchError(this.handleError<any>('getAllData', []))
    );
}

getAllCountriesDataWorldMeter(): Observable<any> {
  //this.loaderService.showLoader();

  return this.http.get<any>(this._getAllCountriesApiBaseUrl())
    .pipe(
      tap(_ => {
        console.log('fetched data: ', _.length);
        //this.loaderService.hideLoader();
      }),
      catchError(this.handleError<any>('getAllData', []))
    );
}

getTotalDataWorldMeter(): Observable<any> {
  //this.loaderService.showLoader();

  return this.http.get<any>(this._getTotalApiBaseUrl())
    .pipe(
      tap(_ => {
        console.log('fetched data: ', _.length);
        //this.loaderService.hideLoader();
      }),
      catchError(this.handleError<any>('getAllData', []))
    );
}

getNewsData(): Observable<any> {
  return this.newsApiService.everything({
    q: 'trump'
})}

getNewsDataGoogle(): Observable<any> {
  return this.http.get<any>(this._getGoogleNewsUrl())
    .pipe(
      tap(_ => {
        console.log('getNewsDataGoogle data: ', _.length);
      }),
      catchError(this.handleError<any>('getNewsData', []))
    );
}

getMediaStackNews(): Observable<any> {
  return this.http.get<any>(this._getMediaStackUrl())
    .pipe(
      tap(),
      catchError(this.handleError<any>('getNewsData', []))
    );
}


private _getAllCountriesApiBaseUrl(){
  if (environment.mockEnv) {
    return  '../assets/mock/worldmeter_all.json';
  }
  return this.getAllCountriesApiBaseUrlWorlMeter;
}

private _getTotalApiBaseUrl(){
  if (environment.mockEnv) {
    return  '../assets/mock/worldmeter_total.json';
  }
  return this.getTotalApiBaseUrlWorlMeter;
}


private _getJsonFormatUrl() {
  if (environment.mockEnv) {
    return  '../assets/mock/home.json';
  }
  return this.apiBaseUrl + '?format=json';
}


private _getGoogleNewsUrl(){
  if (environment.mockEnv) {
    return  '../assets/mock/news.xml';
  }
  return this.googleUrl;
}


private _getMediaStackUrl(){
  if (environment.mockEnv) {
    return  '../assets/mock/mediastack.json';
  }
  return this.mediaStackUrl;
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    this.loaderService.hideLoader();

    // TODO: send the error to remote logging infrastructure
    console.error("erroreeeee ", error); // log to console instead

    // TODO: better job of transforming error for user consumption
    //this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    this.loaderService.hideLoader();
    this.router.navigate(['/error']);
    return of(result as T);
  };
}
}

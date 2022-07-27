import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiBaseUrl = environment.apiBaseUrl;
  getTotalApiBaseUrlWorlMeter = environment.totalWorldMeterApiBaseUrl;
  getAllCountriesApiBaseUrlWorlMeter = environment.allCountriesWorldMeterApiBaseUrl;

  constructor(private http: HttpClient, private loaderService: LoaderService, private router: Router) { }



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

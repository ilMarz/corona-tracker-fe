import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiBaseUrl = 'https://corona-stats.online';

  constructor(private http: HttpClient) { }



  /** GET data from the server */
getAllData(): Observable<any> {
  return this.http.get<any>(this._getJsonFormatUrl())
    .pipe(
      tap(_ => console.log('fetched data: ', _.data.length)),
      catchError(this.handleError<any>('getAllData', []))
    );
}

  /** GET data from the server */
  getDataByCountry(country: string): Observable<any> {
    return this.http.get<any>(this._getInfoByCountry(country))
      .pipe(
        tap(_ => console.log('fetched data: ', _.data.length)),
        catchError(this.handleError<any>('getAllData', []))
      );
  }


private _getJsonFormatUrl() {
  return this.apiBaseUrl + '?format=json';
}

private _getInfoByCountry(country: string) {
  return this.apiBaseUrl + '/' + country + '?format=json';
}









private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    //this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}

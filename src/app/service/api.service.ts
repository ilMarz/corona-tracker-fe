import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { NewsApiService } from 'angular-news-api';
import { Parser } from 'xml2js';

declare const require;
const xml2js = require('xml2js');

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  keySearch = "[_search_]";
  keyLang = "[_lang_]";

  apiBaseUrl = environment.apiBaseUrl;
  getTotalApiBaseUrlWorlMeter = environment.totalWorldMeterApiBaseUrl;
  getAllCountriesApiBaseUrlWorlMeter = environment.allCountriesWorldMeterApiBaseUrl;
  googleUrl = environment.news.google;
  mediaStackUrl = environment.news.mediastack;
  yahooUrl = environment.news.yahoo;

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

getNewsDataGoogle(input, lang): Observable<any> {
  return this.http.get(this._getGoogleNewsUrl(input, lang), { responseType: 'text' })
    .pipe(
      switchMap(async result => 
        await this._parseXmlToJson(result)
      ),
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

getYahooNews(input): Observable<any> {
  return this.http.get<any>(this._getYahooUrl(input))
    .pipe(
      tap(),
      catchError(this.handleError<any>('getYahooNews', []))
    );
}

getNewsDataViaReqbin(): Observable<any> {


  return this.http.post<any>("https://apius.reqbin.com/api/v1/requests", {"id":"0","name":"","errors":"","json":"{\"method\":\"GET\",\"url\":\"https://www.toptal.com/developers/feed2json/convert?url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3Dapple%26hl%3Den-US%26gl%3DUS%26ceid%3DUS%3Aen\",\"apiNode\":\"US\",\"contentType\":\"\",\"content\":\"\",\"headers\":\"\",\"errors\":\"\",\"curlCmd\":\"\",\"codeCmd\":\"\",\"jsonCmd\":\"\",\"xmlCmd\":\"\",\"lang\":\"\",\"auth\":{\"auth\":\"noAuth\",\"bearerToken\":\"\",\"basicUsername\":\"\",\"basicPassword\":\"\",\"customHeader\":\"\",\"encrypted\":\"\"},\"compare\":false,\"idnUrl\":\"https://www.toptal.com/developers/feed2json/convert?url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3Dapple%26hl%3Den-US%26gl%3DUS%26ceid%3DUS%3Aen\"}","sessionId":1659386911139,"deviceId":"81771e5d-b376-4593-9cde-d727dd4adb90R"})
    .pipe(
      tap(_ => {
        console.log('getNewsDataViaReqbin data: ', _.length);
      }),
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


private _getGoogleNewsUrl(input, lang){
  if (environment.mockEnv) {
    return  '../assets/mock/news.xml';
  }
  input = input ? input : "world"
  lang = lang ? lang : "us";
  return this.googleUrl.replace(this.keySearch, input).replace(this.keyLang, lang);
}


private _getMediaStackUrl(){
  if (environment.mockEnv) {
    return  '../assets/mock/mediastack.json';
  }
  return this.mediaStackUrl;
}

private _getYahooUrl(input){
  if (environment.mockEnv) {
    return  '../assets/mock/yahoo.json';
  }
  input = input ? input : "world"
  return this.yahooUrl.replace(this.keySearch, input);
}

async _parseXmlToJson(xml) {
  return await xml2js
    .parseStringPromise(xml, { explicitArray: false })
    .then(response => response.rss.channel.item);
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

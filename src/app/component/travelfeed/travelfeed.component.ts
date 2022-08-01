import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { LoaderService } from 'src/app/service/loader.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-travelfeed',
  templateUrl: './travelfeed.component.html',
  styleUrls: ['./travelfeed.component.scss']
})
export class TravelfeedComponent implements OnInit {

  showContent = true;
  dataNews = [];
  lastDataRetrieve;

  constructor(private loaderService: LoaderService, private apiService: ApiService) { }

  ngOnInit(): void {
    //this._getFromLSOrExecuteRequest();
    this._getYahooNewsData("covid19");
    this._getGoogleNewsData("covid19", "it");
  }


  private _getNewsData() {
    this.loaderService.showLoader();
    this.apiService.getMediaStackNews().subscribe(
      (res: any) => {
        console.log("saving data news in local storage")
        localStorage.setItem("dataNews", JSON.stringify(res))
        this.lastDataRetrieve = formatDate(new Date(), 'dd/MM/y-HH:m:s', 'en');
        localStorage.setItem("lastDataRetrieve", this.lastDataRetrieve)
        this.dataNews = res;
        this.loaderService.hideLoader();
      }
    );
  }

  private _getGoogleNewsData(input, lang) {
    this.loaderService.showLoader();
    this.apiService.getNewsDataGoogle(input, lang).subscribe(
      (res: any) => {
        this.lastDataRetrieve = formatDate(new Date(), 'dd/MM/y-HH:m:s', 'en');
        console.log("google response")
        console.log(res)
        this.dataNews = res;
        this.loaderService.hideLoader();
      }
    );
  }

  private _getYahooNewsData(input) {
    this.loaderService.showLoader();
    this.apiService.getYahooNews(input).subscribe(
      (res: any) => {
        this.lastDataRetrieve = formatDate(new Date(), 'dd/MM/y-HH:m:s', 'en');
        console.log("yahoo response")
        console.log(res)
        this.dataNews = res;
        this.loaderService.hideLoader();
      }
    );
  }

  private _getFromLSOrExecuteRequest() {
    let dataNewsFromLocalStorage = localStorage.getItem("dataNews");

    if(dataNewsFromLocalStorage!=null) {
      console.log("found data from LS")
      this.dataNews = JSON.parse(dataNewsFromLocalStorage);
    }    
    else {
      console.log("data from LS not found: executing request")
      this._getNewsData(); 
    }  
  }

}

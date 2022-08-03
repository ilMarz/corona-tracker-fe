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

  newsLang = [
    {
      key: "en",
      value: "en"
    },
    {
      key: "it",
      value: "it"
    },
    {
      key: "es",
      value: "es"
    }
  ]

  selectedNewsLang = "en";
  newsSearchInput = "";

  constructor(private loaderService: LoaderService, private apiService: ApiService) { }

  ngOnInit(): void {
    //this._getFromLSOrExecuteRequest();
    //this._getYahooNewsData("coronavirus");
    this._getGoogleNewsData("coronavirus", this.selectedNewsLang);
  }

  doSomething(event) {
    this._getGoogleNewsData("coronavirus", this.selectedNewsLang);
  }

  private _getGoogleNewsData(input, lang) {
    this.loaderService.showLoader();
    this.apiService.getNewsDataGoogle(input, lang).subscribe(
      (res: any) => {
        this.lastDataRetrieve = formatDate(new Date(), 'dd/MM/y-HH:m:s', 'en');
        this.dataNews = res;
        this.loaderService.hideLoader();
      }
    );
  }
}

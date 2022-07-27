import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { LoaderService } from 'src/app/service/loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  infoData = [];
  worldStats;
  columns: string[] = ['cases',
                       'todayCases',
                       'deaths',
                       'todayDeaths',
                       'recovered',
                       'critical',
                       'tests',
                       'active'];
  orderType = 'case';
  textSearch;
  showContent = false;

  constructor(private apiService: ApiService, private loaderService: LoaderService, public translate: TranslateService) {
    this.translate.currentLang = this.translate.getDefaultLang();
   }

  ngOnInit(): void {
    this._getAllCountriesDataFromWorldMeter();
    //this._getTotalDataFromWorldMeter();
  }

  isAllowedColumn(columnName: string): boolean {
    return this.columns.includes(columnName);
  }

  getFontColor(key: string) {
    return key.toLowerCase() + '-font';
  }

  getCountryFlag(iso2: string) {
    return 'https://www.countryflags.io/' + iso2 + '/shiny/24.png';
  }

  getLanguageFlag(currentLang: string) {
    return "/assets/i18n/img/"+currentLang+".png";
  }

  
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  private _getAllDataFromTrackerCli(){
    this.apiService.getAllData().subscribe(
      (res: any) => {
        this.infoData = res.data;
        this.worldStats = res.worldStats;
        this.showContent = true;

        console.log(this.infoData);
      },
      (error: any) => {
        console.error('something went wrong ', error);
      }
    );
  }

  private _getAllCountriesDataFromWorldMeter(){
    this.loaderService.showLoader();
    this.apiService.getAllCountriesDataWorldMeter().subscribe(
      (res: any) => {
        this.infoData = res;
        this._getTotalDataFromWorldMeter();

        console.log(this.infoData);
      }
    );
  }

  private _getTotalDataFromWorldMeter(){
    this.apiService.getTotalDataWorldMeter().subscribe(
      (res: any) => {
        this.worldStats = res;
        this.showContent = this.infoData.length > 0;
        this.loaderService.hideLoader();

        console.log(this.worldStats);
      }
    );
  }
}

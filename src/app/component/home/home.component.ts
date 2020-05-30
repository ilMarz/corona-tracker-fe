import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  infoData = [];
  worldStats;
  columns: string[] = ['cases', 'todayCases',
  'deaths', 'todayDeaths', 'recovered', 'todayRecovered', 'critical', 'tests', 'confirmed'];
  orderType = 'case';
  textSearch;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllData().subscribe(
      (res: any) => {
        this.infoData = res.data;
        this.worldStats = res.worldStats;

        console.log(this.infoData);
      },
      (error: any) => {
        console.error('something went wrong');
      }
    );
  }

  isAllowedColumn(columnName: string): boolean {
    return this.columns.includes(columnName);
  }

  getFontColor(key: string) {
    return key.toLowerCase() + '-font';
  }

  getCountryFlag(countryCode: string) {
    return 'https://www.countryflags.io/' + countryCode + '/shiny/24.png';
  }


  private _setDataSourceForTable(obj: any) {
    return new Array(obj);
  }
}

import { Component, OnInit } from '@angular/core';
import { LoaderService } from './service/loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(private loaderService: LoaderService, public translate: TranslateService) { 
    translate.addLangs(['en', 'it']);
    translate.setDefaultLang('en');
  }

  title = 'corona-tracker-fe';
  showLoader = true;

  ngOnInit(): void {

    setTimeout(() => this.loaderService.loader.subscribe(show => this.showLoader = show), 0);

  }
}

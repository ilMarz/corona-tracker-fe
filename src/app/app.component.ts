import { Component, OnInit } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(private loaderService: LoaderService) { }

  title = 'corona-tracker-fe';
  showLoader = true;

  ngOnInit(): void {

    setTimeout(() => this.loaderService.loader.subscribe(show => this.showLoader = show), 0);

  }
}

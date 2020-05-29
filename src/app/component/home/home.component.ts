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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllData().subscribe(
      (res: any) => {
        this.infoData = res.data;
        this.worldStats = res.worldStats;
        console.log(res);
      },
      (error: any) => {
        console.error('something went wrong');
      }
    );
  }
}

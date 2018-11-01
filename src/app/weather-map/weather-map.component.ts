import { Weather } from './../weather-class';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-weather-map",
  templateUrl: "./weather-map.component.html",
  styleUrls: ["./weather-map.component.css"]
})
export class WeatherMapComponent implements OnInit {
  lat: number = 0.0236;
  lng: number = 37.9062;
  zoom: number = 6.5;
  city = "";
 Clouds;
 Clear;
  // conditions = ['Clear', 'Clouds', 'Rain'];
  getServ = [];

  // foods: Food[] = [
  //   { value: 'clear', viewValue: 'Clear' },
  //   { value: 'cloudy', viewValue: 'Clouds' },
  //   { value: 'rainy', viewValue: 'Rain' }
  // ];
  

    constructor(
    public weatherService: WeatherService) {}

  ngOnInit(): any {
    this.getSeveral();
  }
    getSeveral() {
    this.weatherService.getSeveral(this.city).subscribe((data: any) => {
      // this.getServ.push(data.list);
      this.getServ = data.list;
      console.log(this.getServ);

      // for (var i = 0; i < data.list.length; i++) {
      //   console.log(data.list[i]);

      //   // var sect = this.getServ.weather[0].main;
      //   // if (data.list[i] === this.Clear) sect.push(data.list[i]);
      //   // console.log(data.list[i]);
      // }
    });
  }
}
import { DataserviceService } from './../dataservice.service';
import { Component, OnInit } from '@angular/core';
import { WeatherService} from '../weather.service'
import { NgxSpinnerService } from "ngx-spinner";
import { ActivityMood} from '../datamodel'
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
  providers:[DataserviceService]

})
export class WeatherComponent implements OnInit {
  city = "Eldoret";
  icon = "";
  addCity = "";
  todaysWeather;
  feeds = [];
  suggestion = "";
  weatherForecast = [];
  todayforecast=[];
  actmoodform = new FormGroup({
    activity: new FormControl(),
    mood: new FormControl(),
        weather: new FormControl()

  });
  submitted = false;
  activitymood = new ActivityMood('','','');
  constructor(
    public weatherService: WeatherService,
    private spinner: NgxSpinnerService,
    public dataService:DataserviceService
    ) {}
  ngOnInit(): any {
    this.getCurrentWeather(this.city);
    this.getForecast(this.city);
        this.getactmood();
  }
    getCurrentWeather(city) {
    this.weatherService.getCurrentWeather(city).subscribe(res => {
      this.todaysWeather = res;
      console.log(this.todaysWeather);

      var sugg = this.todaysWeather.weather.main;
      switch (sugg) {
        case "Clear":
          this.suggestion = "Wear a hat and sunglasses";
          break;
        case "Rain":
          this.suggestion = "Carry umbrella and wear jacket";
          break;
        case "Clouds":
          this.suggestion = "He should take his girlfriend out for coffee";
          break;
        default:
          this.suggestion = "Wear a hat and sunglasses";
          break;
      }
    });
  }
  onSubmit(){
    this.spinner.show();
    this.submitted = true;
    this.activitymood=this.actmoodform.value;
    this.dataService.postActivitymood(this.activitymood).subscribe(data=>{
      console.log("POST Request is successful ", data);
})
    console.log('form value',this.actmoodform.value);
    this.getactmood();
    this.spinner.hide();
  }
  searchCity() {
    this.spinner.show();
    this.getactmood();
    this.getCurrentWeather(this.addCity);
        this.weatherForecast = [];
        this.getForecast(this.addCity);
    }
  getForecast(city){
  this.weatherService.getForecast(city).subscribe((data: any) => {
    this.todayforecast = data.list.slice(0, 7);
    console.log(data.list);
  for (let i = 0; i < data.list.length; i += 8) {
    console.log(data.list[i]);
    this.weatherForecast.push(data.list[i]);
    this.spinner.hide();
  }
});
  }
  getactmood(){
    this.dataService.getActivitymood().subscribe((data:any)=>{
      this.feeds = [];
      this.feeds=data;
      console.log(this.feeds);
        // this.actmoodfeeds = data;
   })
  }
}

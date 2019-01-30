import { ActivityMood } from './../datamodel';
import { DataserviceService } from './../dataservice.service';
import { Component, OnInit } from '@angular/core';
import { WeatherService} from '../weather.service'
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { FavoriteComponent} from '../favorite/favorite.component';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {MatDialog, MatDialogConfig} from "@angular/material";


declare var swal: any;

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
    // initialize services
    public weatherService: WeatherService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    public dataService:DataserviceService,
        private router: Router,
        private dialog: MatDialog

    ) {}
  ngOnInit(): any {
    //where the app starts
    this.getCurrentWeather(this.city);//calls getCurrentWeather functions
    this.getForecast(this.city);
        this.getactmood();
  }
    getCurrentWeather(city) {
    this.weatherService.getCurrentWeather(city).subscribe(res => {
      this.todaysWeather = res;
      console.log(this.todaysWeather);

      var sugg = this.todaysWeather.weather.main;// gives suggestions according to differnt weather conditions
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
    }, (error)=>{
      swal({
        // sweetaleart
        type: 'error',
        title: 'Oops...',
        text: 'Could not find your city',
      })
    });
  }
  openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;      
       this.dialog.open(FavoriteComponent, dialogConfig);

        const dialogRef = this.dialog.open(FavoriteComponent, dialogConfig);

         dialogRef.afterClosed().subscribe(
         data => 
         
         {console.log("Dialog output:", data)
         this.activitymood=data;

           this.dataService.postActivitymood(this.activitymood).subscribe(data =>
            
            {
             console.log("POST Request is successful ", data);
            //  swal("Good job!", "Submitted successfully", "success")             
            }
           );
         }
     );         
}

  onSubmit(){
    // submits weather mood and activity to mongodb
    this.spinner.show();
    this.submitted = true;
    this.activitymood=this.actmoodform.value;
    this.dataService.postActivitymood(this.activitymood).subscribe(data=>{
      console.log("POST Request is successful ", data);


      swal("Good job!", "Submitted successfully", "success")


})
    console.log('form value',this.actmoodform.value);
    this.spinner.hide();
  }
  searchCity() {
    // search different cities
    this.spinner.show();
    this.getactmood();
    this.getCurrentWeather(this.addCity);
        this.weatherForecast = [];
        this.getForecast(this.addCity);

    }
  getForecast(city){
    //returns 5 day forecasts
  this.weatherService.getForecast(city).subscribe((data: any) => {
    this.todayforecast = data.list.slice(0, 7);
    console.log(data.list);
  for (let i = 0; i < data.list.length; i += 8) {
    console.log(data.list[i]);
    this.weatherForecast.push(data.list[i]);
  
  }
    this.spinner.hide();

},
    (error) => {
      this.spinner.hide();
    });
  }
  getactmood(){
    //returns moods and activities from mongodb
    this.dataService.getActivitymood().subscribe((data:any)=>{
      this.feeds = [];
      this.feeds=data;
      console.log(this.feeds);
        // this.actmoodfeeds = data;
        
   },(error)=>{
      //  swal({
      //   type: 'error',
      //   title: 'Oops...',
      //   text: 'Could not your moods and activities',
      // })
   });
  }
   logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

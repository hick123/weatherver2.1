import { TimelineComponent } from './timeline/timeline.component';
import { WeatherComponent } from './weather/weather.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { WeatherMapComponent } from './weather-map/weather-map.component';

const routes: Routes = [
  // { path: "", redirectTo: "/weather", pathMatch: "full" },
  { path: "", component: WeatherComponent },
  { path: "weather-map", component: WeatherMapComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
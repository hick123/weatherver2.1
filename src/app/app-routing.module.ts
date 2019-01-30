import { WeatherComponent } from './weather/weather.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { WeatherMapComponent } from './weather-map/weather-map.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_auth_guard/auth.guard';

const routes: Routes = [
  // { path: "", redirectTo: "/weather", pathMatch: "full" },
  // { path: "", component: WeatherComponent },
  // { path: "weather-map", component: WeatherMapComponent }
  // ];
  { path: '', component: WeatherComponent },
    // { path: '', component: WeatherComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'weather-map', component: WeatherMapComponent, canActivate: [AuthGuard] },
  // { path: 'weather-map', component: WeatherMapComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
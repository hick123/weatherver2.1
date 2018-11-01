import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityMood} from './datamodel';
import { map,tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private actsmoodsUrl = 'http://localhost:3000/activitymoods';  // URL to web api
  constructor(private http: HttpClient) { }

  getActivitymood(): Observable <any[]>{
    return this.http.get<any[]>(this.actsmoodsUrl).pipe(map((res: any) => {
      if (res && res.activitymoods){
        return res.activitymoods;
      }else{
        return [];
      }
    }))

  }
  postActivitymood(activitymood: ActivityMood): Observable<any> {
    return this.http.post<ActivityMood>(this.actsmoodsUrl, activitymood, httpOptions).pipe(map((res: any) => {
      console.log('post actvitymood',activitymood);
    }))
  }
}

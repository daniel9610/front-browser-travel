import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiBrowserTravelService {

  api_data: any;
  public api_tk = environment.api_tk;
  // public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'accept':'application/json', 'authorization':this.api_tk})};
  public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'accept':'application/json', 'Access-Control-Allow-Origin':'*'})};
  public api_url = environment.humidities_url;

  constructor(
    private http: HttpClient
    ) { }

  postInsertVehicle(api_consult:string, lng: string, lat: string) {
    this.api_data = {
      "lng":lng,
      "lat":lat,
    };
    const data = JSON.stringify(this.api_data);
    return this.http.post(this.api_url + api_consult, data);
  }

  public getHumidities(api_consult:string) {
    return this.http.get(this.api_url+api_consult).pipe(map(this.extractData));
  }

  public getHumidityPlace(api_consult:string,  lng: string, lat: string) {
    return this.http.get(this.api_url+api_consult+'/'+lng+'/'+lat).pipe(map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}

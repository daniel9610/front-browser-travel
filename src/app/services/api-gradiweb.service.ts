import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiGradiwebService {

  api_data: any;
  public api_tk = environment.api_tk;
  // public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'accept':'application/json', 'authorization':this.api_tk})};
  public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'accept':'application/json', 'Access-Control-Allow-Origin':'*'})};
  public api_url = environment.humidities_url;

  constructor(
    private http: HttpClient
    ) { }

  postInsertVehicle(api_consult:string, type: string, license_plate: string, brand_id: string, user_id: string) {
    this.api_data = {
      "type":type,
      "license_plate":license_plate,
      "brand_id":brand_id,
      "user_id":user_id
    };
    const datos = JSON.stringify(this.api_data);
    return this.http.post(this.api_url + api_consult, datos, this.httpOptions);
  }

  getAllowedUsers(api_consult:string, email: string) {
    let api_data;
    api_data = {
      "user":email,
    };
    const datos = JSON.stringify(api_data);
    return this.http.post(this.api_url + api_consult, datos);
  }

  public getHumidities(api_consult:string) {
    return this.http.get(this.api_url+api_consult, this.httpOptions).pipe(map(this.extractData));
  }

  public getVehicles(api_consult:string) {
    return this.http.get(this.api_url+api_consult, this.httpOptions).pipe(map(this.extractData));
  }

  public getBrands(api_consult:string) {
    return this.http.get(this.api_url+api_consult, this.httpOptions).pipe(map(this.extractData));
  }

  public getUsers(api_consult:string) {
    return this.http.get(this.api_url+api_consult, this.httpOptions).pipe(map(this.extractData));
  }

  public getVehiclesForBrand(api_consult:string, brand_id:string) {
    return this.http.get(this.api_url+api_consult+'/'+brand_id, this.httpOptions).pipe(map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}

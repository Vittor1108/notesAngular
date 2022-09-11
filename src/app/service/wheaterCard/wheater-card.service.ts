import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WheaterCardService {

  apiWheater: {key: string, base: string, lang: string, units: string}  = {
    key:'d0aeb0f0713eebee8524d7cd511265ea',
    lang: 'pt_br',
    units: 'metric',
    base: 'https://api.openweathermap.org/data/2.5/weather?'
  }

  constructor(private http: HttpClient) { }

  async userLocation(infoLocation: {lat:number, lng: number}): Promise<any>{
    const latToString = `${infoLocation.lat}`;
    const lngToString = `${infoLocation.lng}`;
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latToString},${lngToString}&key=AIzaSyDwtppucHKFFibgjm26VF-r2wcgSidMyE0`);
  }

  async getWheater(latLng: {lat: number, lng: number}): Promise<any> {
    return this.http.get(`${this.apiWheater.base}lat=${latLng.lat}&lon=${latLng.lng}&lang=${this.apiWheater.lang}&units=${this.apiWheater.units}&appid=${this.apiWheater.key}`);
  }
}



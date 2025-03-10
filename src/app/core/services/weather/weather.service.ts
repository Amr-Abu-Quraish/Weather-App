import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient:HttpClient) { }

  private readonly apiUrl = 'https://api.weatherapi.com/v1/forecast.json';
  private readonly apiKey = '03f2166c13fe419f926153727240612';



  getWeatherByCoords(latitude: number, longitude: number, days: number = 3): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}?key=${this.apiKey}&q=${latitude},${longitude}&days=${days}&aqi=no&alerts=no`);
  }
  getWeather(city: string, days: number = 3): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}?key=${this.apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`);
  }

}

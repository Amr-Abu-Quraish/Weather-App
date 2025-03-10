import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../../core/services/weather/weather.service';
import { Iweather } from '../../iweather';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{


  private readonly weatherService = inject(WeatherService)


  getDayName(dateString: string| undefined): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
  getDayDate(dateString: string| undefined): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
  }


  weatherData!:Iweather;

  showWeather(city: string): void {
    this.weatherService.getWeather(city).subscribe({
      next: (res) => {
        console.log(res);

        this.weatherData = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


    @ViewChild('input') input!:ElementRef

    findcity():void{
      const city = this.input.nativeElement.value.trim();
      if (!city) {

        this.showWeather('Cairo');
      } else {
        this.showWeather(city);
      }
    }


  ngOnInit(): void {
    this.showWeather('cairo')






  }


}

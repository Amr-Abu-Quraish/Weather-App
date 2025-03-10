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
  showWeather(cityOrLatitude: string | number, longitude?: number): void {
    if (typeof cityOrLatitude === 'string') {

      this.weatherService.getWeather(cityOrLatitude).subscribe({
        next: (res: Iweather) => {
          console.log(res);
          this.weatherData = res;
        },
        error: (err: Error) => {
          console.error(err.message);
        }
      });
    } else if (typeof cityOrLatitude === 'number' && typeof longitude === 'number') {

      this.weatherService.getWeatherByCoords(cityOrLatitude, longitude).subscribe({
        next: (res: Iweather) => {
          console.log(res);
          this.weatherData = res;
        },
        error: (err: Error) => {
          console.error(err.message);
        }
      });
    } else {
      console.error("error");
    }
  }





    @ViewChild('input') input!:ElementRef

    findcity():void{
      const city = this.input.nativeElement.value.trim();
      if (!city) {

        this.showWeather(this.myLatitude, this.myLongitude);
      } else {
        this.showWeather(city);
      }
    }


    myLatitude!: number;
    myLongitude!: number;

    ngOnInit(): void {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);

        this.myLongitude = position.coords.longitude;
        this.myLatitude = position.coords.latitude;

        this.showWeather(this.myLatitude, this.myLongitude);
      });
    }



}

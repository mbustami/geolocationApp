import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationsService {

  constructor(private _http: Http) { }

  // returning a static array of objects for the 5 locations (dummy data to initialize the app)
  getLocations() {

  	return [
  		{
  			name: 'Address1',
  			lat: 41.87194,
  			lng: 13.56738
  		},
  		{
  			name: 'Address2',
        lat: 41.37194,
        lng: 13.66738
  		},
  		{
  			name: 'Address3',
  			lat: 0.00,
  			lng: 0.00
  		},
  		{
  			name: 'Address4',
        lat: 0.00,
        lng: 0.00
  		},
  		{
  			name: 'Address5',
        lat: 0.00,
        lng: 0.00
  		}
  	]

  }

  getPhysicalAddress(url) {
    return this._http.get(url)
      .map(response => response.json());
  }

}

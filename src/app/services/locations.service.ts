import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationsService {

  constructor(private _http: Http) { }

  // returning a static array for the 5 locations
  getLocations() {

  	return [
  		{
  			name: 'Address1',
  			lat: 32.4862285,
  			lng: 36.892096599999996
  		},
  		{
  			name: 'Address2',
  			lat: 31.5862285,
  			lng: 35.892096599999997
  		},
  		{
  			name: 'Address3',
  			lat: 31.5862285,
  			lng: 34.892096599999991
  		},
  		{
  			name: 'Address4',
  			lat: 31.5762285,
  			lng: 34.492096599999999
  		},
  		{
  			name: 'Address5',
				lat: 37.5762285,
  			lng: 37.492096599999999
  		}
  	]

  }

  getPhysicalAddress(url) {
    return this._http.get(url)
      .map(response => response.json());
  }

}

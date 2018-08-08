import { Component, OnInit, NgZone } from '@angular/core';
import { LocationsService } from '../services/locations.service';
declare const google: any;

@Component({
  selector: 'map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.css']
})
export class Map2Component implements OnInit {

  lat: number;
  lng: number;
  newLat: number;
  newLng: number;
  address;
  newAddress;
  map;
  closest;
  newClosest;
  locations;

  constructor(private locationsService: LocationsService, private ngZone: NgZone) {
  	this.locations = locationsService.getLocations();
  }

  ngOnInit() {
  	this.locate();
  }

  private locate() {
  	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(
    		position => {
				 	this.lat = position.coords.latitude;
		 			this.lng = position.coords.longitude;

		 			// Reverse Geocoding
		 			let geocoder = new google.maps.Geocoder();
		 			let latlng = new google.maps.LatLng(this.lat, this.lng);
		 			let request = {
            latLng: latlng
          };
          geocoder.geocode(request, (results, status) => {
	          if (status == google.maps.GeocoderStatus.OK) {
	            if (results[0] != null) {
	            	this.ngZone.run(() => {
					        this.address = results[0].formatted_address;
					      });
	            } else {
	            	// Should be replaced with more friendly warnings in the future
	              alert("No address available");
	            }
	          }
          });

		 			// Map options
		 			var options = {
						zoom: 8,
						center: {lat: this.lat, lng: this.lng}
					}

					// New Map
					this.map = new google.maps.Map(document.getElementById('map'), options);

					// Current Location Marker
					var marker = new google.maps.Marker({
			      position: {lat: this.lat, lng: this.lng},
			      map: this.map,
			      animation: google.maps.Animation.BOUNCE
			    });

					// Add locations Markers
			    this.locations.forEach((location) => {
			    	this.addMarker(this.map, location.lat, location.lng, location.name);
			    })

			    // Get the Closest location to our Current Location
		 			this.closest = this.nearestCity(this.lat, this.lng);
    		},
    		error => {
    			// Just logging the error
    			console.log("Error code: " + error.code + "<br /> Error message: " + error.message);
    		}
    	);
  	}
  }

  private addMarker(map, latitude, longitude, name) {
  	// google maps api markers and infoWindows
		let marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: this.map
    });
    let infoWindow = new google.maps.InfoWindow({
    	content: name
    })
    marker.addListener('click', function() {
    	infoWindow.open(map, marker);
    })
  }

	private getLocation(address: HTMLInputElement) {
		this.newAddress = address.value;
		let localAddress = address.value.replace(" ", "+");
		let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + localAddress;

		this.locationsService.getPhysicalAddress(url)
			.subscribe(response => {
				this.newLat = response.results[0].geometry.location.lat;
				this.newLng = response.results[0].geometry.location.lng;
				this.newClosest = this.nearestCity(this.newLat, this.newLng);
			});
	}


  // Find Closest

  private deg2Rad(deg) {
  	return deg * Math.PI / 180;
	}

	private pythagorasEquirectangular(lat1, lon1, lat2, lon2) {
	  // lat1 = lat1 * Math.PI / 180;
	  lat1 = this.deg2Rad(lat1);
	  lat2 = this.deg2Rad(lat2);
	  lon1 = this.deg2Rad(lon1);
	  lon2 = this.deg2Rad(lon2);
	  var R = 6371; // km
	  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
	  var y = (lat2 - lat1);
	  var d = Math.sqrt(x * x + y * y) * R;
	  return d;
	}

  private nearestCity(latitude, longitude) {
	  var mindif = 99999;
	  var closest;

	  for (var index = 0; index < this.locations.length; ++index) {
	    var dif = this.pythagorasEquirectangular(latitude, longitude, this.locations[index]['lat'], this.locations[index]['lng']);
	    this.locations[index]['distance'] = dif;
	    if (dif < mindif) {
	      closest = index;
	      mindif = dif;
	    }
	  }

	  // return the nearest location
	  return this.locations[closest];
	}

}

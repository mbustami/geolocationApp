import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LocationsService } from './services/locations.service';
import { Map2Component } from './map2/map2.component';


@NgModule({
  declarations: [
    AppComponent,
    Map2Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    LocationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

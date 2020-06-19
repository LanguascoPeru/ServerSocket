import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapsComponent } from './components/maps/maps.component';

import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http'

 

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent 
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(environment.socketConfig),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';

import { HttpClientModule } from '@angular/common/http'

// socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

 ///grafica
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../interfaces/interfaces';
 
//var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); cuando no esta pensado para TypeScript
import * as  mapboxgl  from 'mapbox-gl/dist/mapbox-gl.js';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';
 
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  mapa: mapboxgl.Map;

  lugares: {[key:string]: Lugar} = {}
  markerMapBox : { [id:string] : mapboxgl.Marker } = {}



  constructor( private http: HttpClient, private websocketService : WebsocketService) { 
  }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/mapa').subscribe((lugar: any) =>{
      this.lugares = lugar;
      this.crearMapa();
    })

    this.escucharSockets();

  }
  escucharSockets(){
    // marcador nuevo    
    this.websocketService.escucharEventos('marcador-nuevo')
        .subscribe((marcador : Lugar) =>{
           this.agregarMarcador(marcador);
        })


    // marcador mover



    // marcador borrar
    
    this.websocketService.escucharEventos('marcador-borrar').subscribe((idMarcador:string) =>{
 
      this.markerMapBox[idMarcador].remove();
      delete this.markerMapBox[idMarcador];
    })

  }
  crearMapa(){
    
    mapboxgl.accessToken = 'pk.eyJ1IjoianVsaW9jZXNhci1wZXJ1IiwiYSI6ImNqdHVpczA3cDFldHk0M3BlaG9xbmc2NWMifQ.lk1PMjUrXYEf9S3u9YsC8A';
    
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center : [-75.75512993582937 ,45.349977429009954],
      zoom : 15.8
    });

    for (let [key ,marcador] of Object.entries(this.lugares)) {
      this.agregarMarcador(marcador);
    }
  }

  
  agregarMarcador(marcador:Lugar){    
    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;

    const btnBorrar  = document.createElement('button');
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append(h2,btnBorrar);

    const customPopup  = new mapboxgl.Popup({
      offset : 25,
      closeOnClick : false
    }).setDOMContent(div);


    const marker = new mapboxgl.Marker({
      draggable : true,
      color : marcador.color
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup(customPopup)
    .addTo(this.mapa);

    marker.on('drag', ()=>{
      
      const lngLat = marker.getLngLat();
      console.log(lngLat);
      //TODO : crear evento Emitir para  eliminar marcador socket
  

    })

    btnBorrar.addEventListener('click',()=>{
      marker.remove();
      // TODO: Eliminar  el marcador mediante socket 

      this.websocketService.emitirEventos('marcador-borrar', marcador.id);

    })

    this.markerMapBox[marcador.id] = marcador;
 }

  crearMarcador(){
    const NewMarker : Lugar =  {
        id: new Date().toISOString(),
        nombre: 'Julio cesar',
        lng: -75.75512993582937,
        lat: 45.349977429009954,
        color: '#' + Math.floor(Math.random()*16777215).toString(16) 
      } 

    this.agregarMarcador(NewMarker);
    this.websocketService.emitirEventos('marcador-nuevo',NewMarker);

  }

 

  


}

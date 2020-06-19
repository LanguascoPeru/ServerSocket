import { Component,  ViewChild, ElementRef,  AfterViewInit } from '@angular/core';
declare var $;
 

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements  AfterViewInit   {

 
  @ViewChild('mapa', {static: false}) mapaElement: ElementRef;
  @ViewChild('dataTable', {static: false}) table: ElementRef;
  dataTable: any;
  dtOption: any = {};


  map : google.maps.Map;
  service : google.maps.DirectionsService;
  renderer : google.maps.DirectionsRenderer;
  infoWindow : google.maps.InfoWindow;
  geocoder : google.maps.Geocoder;

  markers :any[] = [];
  Polyline :any;


  features:any[] = [
    {
      position: new google.maps.LatLng(-33.91721, 151.22630),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91539, 151.22820),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91747, 151.22912),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91910, 151.22907),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91725, 151.23011),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91872, 151.23089),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91784, 151.23094),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91682, 151.23149),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91790, 151.23463),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91666, 151.23468),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.916988, 151.233640),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      type: 'library'
    }
  ];

  Index_Global = 0;

  constructor() { }

  ngAfterViewInit() {
    this.InicializarMapa()

    this.dtOption = {
      "scrollY":  "300px",
      "scrollX": true,
      "scrollCollapse" : true,
      "paging" :  true,
      "fixedColumns":   {
        "leftColumns": 2
    }
  };
    this.dataTable = $(this.table.nativeElement);

    this.dataTable.DataTable(this.dtOption);
  }
 

  cargarMapa(){

    const latLng = new google.maps.LatLng(-12.046374, -77.0427934 );

    const  mapaOption : google.maps.MapOptions = {
       center : latLng,
       zoom : 13,
       mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }
    }

    this.map = new google.maps.Map(this.mapaElement.nativeElement ,mapaOption);

    const marker = new google.maps.Marker({
      position: latLng,
      title:"Hello World!"
    });
    
    marker.setMap(this.map);
    
  }


  InicializarMapa() {

    const  polyoptions : google.maps.PolylineOptions = { 
       strokeColor: "green",
    }

    this.renderer = new google.maps.DirectionsRenderer(polyoptions);

    const latLng = new google.maps.LatLng(-12.046374, -77.0427934 );
    const  mapaOption : google.maps.MapOptions = {
      center : latLng,
      zoom : 13,
      mapTypeControl: true,
       mapTypeControlOptions: {
           style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
           position: google.maps.ControlPosition.TOP_CENTER
       },
       zoomControl: true,
       zoomControlOptions: {
           position: google.maps.ControlPosition.LEFT_CENTER
       },
       scaleControl: true,
       streetViewControl: true,
       streetViewControlOptions: {
           position: google.maps.ControlPosition.LEFT_TOP
       }
    }
    this.map = new google.maps.Map(this.mapaElement.nativeElement, mapaOption  );
    this.geocoder  = new google.maps.Geocoder();

    this.renderer.setMap(this.map);

    // var icons = {
    //     Termino: {
    //         name: 'Operario Termino Recorrido',
    //         icon: '../Content/Imagen/supervisor_on.png',
    //     },
    //     Inicio: {
    //         name: 'Operario Inicio Recorrido',
    //         icon: '../Content/Imagen/operario.png'
    //     },
    //     Recorrido: {
    //         name: 'Operario Recorrido',
    //         icon: '../Content/Imagen/seg_operario.png',
    //     },
    //     RecorridoLDS: {
    //         name: 'Suministro Consultado',
    //         icon: '../Content/Imagen/suministro.png',
    //     },
    // };

    // var legend = document.getElementById('legend');
    // for (var key in icons) {
    //     var type = icons[key];
    //     var name = type.name;
    //     var icon = type.icon;
    //     var div = document.createElement('div');

    //     if (name == 'Operario Inicio Recorrido') {
    //         div.innerHTML = '<img src="' + icon + '" style="margin-top: -16px;margin-left: -4px;"> ' + name;
    //     }
    //     else if (name == 'Operario Recorrido') {
    //         div.innerHTML = '<img src="' + icon + '" style="margin-top: -12px;margin-left: -4px;"> ' + name;
    //     }
    //     else {
    //         div.innerHTML = '<img src="' + icon + '"> ' + name;
    //     }


    //     legend.appendChild(div);
    // }
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(legend);


 


    // for (var i = 0; i < this.features.length; i++) {
    //   // creando los marcadores
    //   this.createMarker_Lectura(this.features[i], i);
    //   // Fin de creando los marcadores
    // }

    this.MostrarUbicacionesMap(this.features);


  };

  RemoveMarker(map) {
    // for (var i = 0; i < $scope.markers.length; i++) {
    //     $scope.markers[i].setMap(map);
    // }
  }

  RemoveLine(map) {
    // if (Polyline != undefined) {
    //     Polyline.setMap(map);
    // } 
  }


  MostrarUbicacionesMap_Lectura_individual(obj_Lista) {
    this.markers = [];                
    /////---fin de  Enfocando el recorrido

    for (var i = 0; i < obj_Lista.length; i++) {
        // creando los marcadores
        this.createMarker_Lectura(obj_Lista[i], i);
        // Fin de creando los marcadores
    }

    // $timeout(function () {
    //     if (maxRecorrido == 0) {
    //         AgregarLeyendaMapa();
    //     }
    // },1000);
  }


  createMarker_Lectura(info, posicion) {
 
                              

            // Llamamos a la función geodecode pasandole la dirección que hemos introducido en la caja de texto.
            // this.geocoder.geocode({ 'address': info.direction }, (results, status)=>{
            //    if (status == 'OK') {     
            //         var icono = '';
            //         var titulo = ''
            //         var ContenidoMarker = '';
            //         ContenidoMarker += '<div id="_market" style="width:510px;height:100px;position:relative;">';
            //         ContenidoMarker += '<table><tr><td><strong >Suministro</strong></td><td>: ' + results[0].formatted_address+ '</td></tr>';
            //          ContenidoMarker += '</table>';
            //         ContenidoMarker += '</div>'; 

            //         icono = '../Content/Imagen/suministro.png',
            //         titulo = 'SUMINISTRO';

            //         this.infoWindow = new google.maps.InfoWindow({
            //           content: ContenidoMarker
            //         });
                  
            //         const marker = new google.maps.Marker({
            //           position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
            //           map: this.map,
            //           title: 'Uluru (Ayers Rock)'
            //         });
            
            //         marker.addListener('click', ()=>{
            //             this.infoWindow.open(this.map, marker);
            //         });

            //         this.markers.push(marker);

            //         //--Efecto de animacion--
            //         this.markers[0].setAnimation(google.maps.Animation.BOUNCE);

            //     }
            // });
     
        //// mostrando marker e infowindows

        var icono = '';
        var titulo = ''
        var ContenidoMarker = '';
        ContenidoMarker += '<div id="_market" style="width:510px;height:100px;position:relative;">';
        ContenidoMarker += '<table><tr><td><strong >Suministro</strong></td><td>: julio</td></tr>';

        ContenidoMarker += '</table>';
        ContenidoMarker += '</div>';
 
        icono = '',
        titulo = 'SUMINISTRO';

        this.infoWindow = new google.maps.InfoWindow({
          content: ContenidoMarker,
        });
      
        const marker = new google.maps.Marker({
          position: info.position,
          map: this.map,
          title: 'Uluru (Ayers Rock)'
        });

        marker.addListener('click', ()=>{
            this.infoWindow.open(this.map, marker);
        });

        this.markers.push(marker);
        this.markers[0].setAnimation(google.maps.Animation.BOUNCE);

                                    
  }


  MostrarUbicacionesMap(obj_Lista) {

    console.log(obj_Lista)
  
     this.markers = [];
 

    //contiene la Latitud y Longitud de los Operarios
    const List_direcciones :any [] = [];
    const maxRecorrido = obj_Lista.length - 1;


    ///---fin de  Enfocando el recorrido
    this.service = new google.maps.DirectionsService;


    for (var i = 0; i < obj_Lista.length; i++) {
        // creando los marcadores
        // createMarker(obj_Lista[i], i);
        // Fin de creando los marcadores
        List_direcciones.push({ lat: parseFloat(obj_Lista[i].position.lat()), lng: parseFloat(obj_Lista[i].position.lng()), name: 'Station ' + i })
    }

    // Divide route to several List_Particionada_direcc because max List_direcciones limit is 25 (23 waypoints + 1 origin + 1 destination)
    for (var i = 0, List_Particionada_direcc = [], max = 25 - 1; i < List_direcciones.length; i = i + max) {
        List_Particionada_direcc.push(List_direcciones.slice(i, i + max + 1));
    }


   const maxRecorrido2 = List_Particionada_direcc.length ;

    // Service callback to process service results
    const service_callback = (response, status) => {
        if (status != 'OK') {
            console.log('Directions request failed due to ' + status);
            if (status == 'OVER_QUERY_LIMIT') {
                setTimeout(function () {
                    // Google maps service la Misma Busqueda
                    Ejecutando_Busqueda_Direccion_google(this.Index_Global)
                }, 3000);
            } else {
                // Google maps service siguiente Busqueda
                Ejecutando_Busqueda_Direccion_google(this.Index_Global + 1)
            }
        } else {
              const  polyoptions : google.maps.PolylineOptions = { 
                icons: [{
                    icon: {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        strokeColor: '#FF0000',
                        fillColor: '#FF0000',
                        strokeWeight: 1,
                        fillOpacity: 1
                    },
                    repeat: '100px',
                }],
                strokeWeight: 2,
                strokeColor: '#85abf2',
             }  

            this.renderer = new google.maps.DirectionsRenderer(polyoptions);
            this.renderer.setMap(this.map);
            this.renderer.setOptions({ suppressMarkers: true, preserveViewport: true });
            this.renderer.setDirections(response);

            // Google maps service siguiente Busqueda
            Ejecutando_Busqueda_Direccion_google(this.Index_Global + 1)
        }
    };

    var Ejecutando_Busqueda_Direccion_google = (index) => {

        this.Index_Global = index;
        if (index == maxRecorrido2) {
            return;
        }
        // Waypoints does not include first station (origin) and last station (destination)
        var waypoints = [];
        for (var j = 1; j < List_Particionada_direcc[index].length - 1; j++) {
            waypoints.push({ location: List_Particionada_direcc[index][j], stopover: false });
        }

        // Service options
        var serviceOptions : any = {
            origin: List_Particionada_direcc[index][0],
            destination: List_Particionada_direcc[index][List_Particionada_direcc[index].length - 1],
            waypoints: waypoints,
            travelMode: 'WALKING'
        };
        // Send request
        this.service.route(serviceOptions, service_callback);
    }
    // Google maps service
    Ejecutando_Busqueda_Direccion_google(0)
}





}

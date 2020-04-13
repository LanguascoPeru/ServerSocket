import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(public websocketService: WebsocketService, private router : Router) { }

  ngOnInit(): void {    
    this.websocketService.loginWebSocket(this.websocketService.usuario.nombre);
  }
  Salir(){
    this.websocketService.logoutWebSocket().then( (res)=>{
        this.router.navigateByUrl('/');
    });
  }

}
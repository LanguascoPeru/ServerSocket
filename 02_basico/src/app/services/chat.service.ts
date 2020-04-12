import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private websocketService : WebsocketService) { }

  sendMessage(mensaje:string){
    const data = {
      de: this.websocketService.getUsuario().nombre,
      cuerpo: mensaje
    }
    this.websocketService.emitirEventos('mensaje', data)
  }


  getMessages(){
    return this.websocketService.escucharEventos('mensaje-nuevo');
  }


  getMessagesPrivate(){
    return this.websocketService.escucharEventos('mensaje-privado');
  }
 


}

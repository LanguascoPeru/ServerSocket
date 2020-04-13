import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario.model';
 
 
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket) { 
    this.leerStorageUser();
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect', ()=>{
      console.log('conectado al servidor');
      this.socketStatus= true;

      if(this.usuario){
        this.loginWebSocket(this.usuario.nombre)
      }

    })
 
    this.socket.on('disconnect', ()=>{
      console.log('desconectado del servidor');

      this.socketStatus= false;
    })
  }

  emitirEventos(evento:string, payload ?:any, callback?:Function){  /// emit
      this.socket.emit(evento,payload, callback);
  }

  escucharEventos(evento:string){   /// on 
    return this.socket.fromEvent(evento);
  }


  getUsuario(){
    return this.usuario;
  }

  loginWebSocket( nombre :string){
    //como no sabemos cuando termina el socket lo metemos dentro de una promesa
    return new Promise((resolve, reject) => {
      
      this.emitirEventos('configurar-usuario',  {nombre:nombre} , (resp)=>{ 
        if (resp.ok==true) {
          this.usuario = new Usuario(nombre);
          this.guardarStorageUser();
          resolve(true);
        }else{
          reject(false);
        }  

      })

    })

  }

  logoutWebSocket(){
    return new Promise((resolve, reject) => {      
      this.emitirEventos('configurar-usuario',  {nombre:'sin nombre'} , (resp)=>{ 
        if (resp.ok==true) {
          this.usuario = null;
          localStorage.removeItem('usuario');
          resolve(true);
        }else{
          reject(false);
        }  
      })

    })

  }
 
  /// lo almacenamos en el local storge para tener persistente la informacion
  guardarStorageUser(){
    localStorage.setItem('usuario', JSON.stringify( this.usuario))
  }

  leerStorageUser(){
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }



}

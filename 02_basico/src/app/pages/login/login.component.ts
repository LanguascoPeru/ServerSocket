import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = "";
  constructor( private websocketService : WebsocketService, private router:Router ) { }

  ngOnInit(): void {
  }

  ingresar(){
   
    if (this.nombre.trim().length ===0) {
      return;
    }
   this.websocketService.loginWebSocket(this.nombre)
       .then( res =>{
         if (res==true) {
          this.nombre = "";
          this.router.navigateByUrl('/mensajes')
         }
       })

  }


}

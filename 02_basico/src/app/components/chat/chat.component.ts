import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
 

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {


  texto :string="";
  mensajeSubcription :Subscription;
  mensajes:any[] = [];
  elemento:HTMLElement;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {

  this.elemento = document.getElementById('chat-mensajes');

  this.mensajeSubcription = this.chatService.getMessages()
        .subscribe((mens)=>{
          console.log('mensajes nuevo' , mens);
          this.mensajes.push(mens);

          setTimeout(() => {
            this.elemento.scrollTop = this.elemento.scrollHeight;
          }, 50);

        })
  }

  ngOnDestroy(){
    this.mensajeSubcription.unsubscribe();
  }

  enviar(){   
    if( this.texto.trim().length ===0){
      return;
    }
    
    this.chatService.sendMessage(this.texto); 
    this.texto = "";
  }

}

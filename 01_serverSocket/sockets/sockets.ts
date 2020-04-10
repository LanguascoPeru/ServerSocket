import { Socket  } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = (cliente: Socket ) =>{

    cliente.on('disconnect',()=>{
        console.log( 'cliente desconectado')
    })

}

export const mensajes = (cliente: Socket, io: socketIO.Server ) =>{

    ///escuchar eventos
    cliente.on('mensaje',( payload : any)=>{
      console.log(payload)
      
      /// emtir mensajes
      io.emit('mensaje-nuevo', payload);

    })

}


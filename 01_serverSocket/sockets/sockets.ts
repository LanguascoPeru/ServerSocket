import { Socket  } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioBL } from '../classes/usuarioBL';
import { Usuario } from '../classes/usuario';

export const userConectados = new UsuarioBL();

export const conectarCliente = (cliente: Socket )=> {    

    const user:Usuario = new Usuario(cliente.id);
    userConectados.agregarUsuario(user)
}

export const desconectar = (cliente: Socket ) =>{

    cliente.on('disconnect',()=>{        
       const userDelete =  userConectados.borrarUsuario(cliente.id)
        console.log( 'cliente desconectado' , userDelete )
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

export const configurarUsuario = (cliente: Socket, io: socketIO.Server ) =>{
        //
    cliente.on('configurar-usuario', ( payload, callback) =>{        
      
        userConectados.actualizarNombre( cliente.id, payload.nombre);
        
        callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });

    })
}




import { Socket  } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioBL } from '../classes/usuarioBL';
import { Usuario } from '../classes/usuario';

export const userConectados = new UsuarioBL();

export const conectarCliente = (cliente: Socket, io : SocketIO.Server )=> {    

    const user:Usuario = new Usuario(cliente.id);
    userConectados.agregarUsuario(user);

    // ///---- enviando la lista de usuariosss
    // io.emit('usuarios-activos', userConectados.getUsuarios());
}

export const desconectar = (cliente: Socket ,  io: socketIO.Server) =>{

    cliente.on('disconnect',()=>{        
        const userDelete =  userConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', userConectados.getUsuarios());
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

        console.log('-------ACTUALIZANDO USUARIOS ------')
      
        userConectados.actualizarNombre( cliente.id, payload.nombre);

        io.emit('usuarios-activos', userConectados.getUsuarios());
        
        callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });

    })
}

export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server ) =>{
        ///escuchar eventos
        cliente.on('obtener-usuarios',()=>{
            io.to(cliente.id).emit('usuarios-activos', userConectados.getUsuarios());
        })
}


 




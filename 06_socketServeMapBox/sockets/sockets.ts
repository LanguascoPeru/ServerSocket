import { Socket  } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioBL } from '../classes/usuarioBL';
import { Usuario } from '../classes/usuario';
import { Mapa_BL } from '../classes/mapa';
import { Marcador } from '../classes/marcador';
 
export const userConectados = new UsuarioBL();
export const mapaBL = new Mapa_BL();

 
export const crearMarcador = (cliente: Socket, io : SocketIO.Server )=> {    
    
    cliente.on('marcador-nuevo', (newMarcador) =>{
        console.log(newMarcador);
    })
}

// cliente instancia aplicacion corriendo ,  io = instancia del Servidor y de los  Socket
export const mapaSocket = (cliente: Socket, io : SocketIO.Server )=> {    
    
    cliente.on('marcador-nuevo', (newMarcador : Marcador) =>{
        mapaBL.agregarMarcador(newMarcador);
        
        // mostrando todos los nuevos marcadores a tosdos los clientes sockets INCLUYENDOME a  mi
        //cliente.emit('', mapaBL.getMarcadores())

        // mostrando todos los nuevos marcadores a tosdos los clientes sockets EXCCLUYENDOME a  mi
        cliente.broadcast.emit('marcador-nuevo', newMarcador)

    })

    cliente.on('marcador-borrar', (idMarcador : string) =>{

        /// borrando  del arreglo ---
        mapaBL.borrarMarcador(idMarcador);
        
        /// notificando a los clientes socket
        cliente.broadcast.emit('marcador-borrar',idMarcador)
     })



}





export const conectarCliente = (cliente: Socket, io : SocketIO.Server )=> {    

    const user:Usuario = new Usuario(cliente.id);
    userConectados.agregarUsuario(user);

    console.log( userConectados.getUsuarios())

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


 




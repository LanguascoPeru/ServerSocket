import { Router, Request, Response	} from 'express';
import Server from '../classes/server';
import { userConectados } from '../sockets/sockets';
 
 

const router = Router();

router.get('/mensajes',( req : Request, res : Response)=>{
    res.json({
        ok:true,
        mensaje: 'todo esta bien'
    })
})

//--- body 
// -- x-www-form-urlencoded
// body.cuerpo;
// body.de;
router.post('/mensajes',( req : Request, res : Response)=>{
    const cuerpo =  req.body.cuerpo;
    const de = req.body.de;

    const server = Server.Instance;
    const payload = { cuerpo , de}

    server.io.emit('mensaje-nuevo', payload)
    
    res.json({
        ok:true,
        mensaje: cuerpo
    })
})


//mandar mensajes privados---
router.post('/mensajes/:id',( req : Request, res : Response)=>{

    const id = req.params.id;
    const cuerpo =  req.body.cuerpo;
    const de = req.body.de;

    const server = Server.Instance;

    const payload = { de,cuerpo }

    ////---mandar mensajes privados por socket por un ID 
    server.io.in(id).emit('mensaje-privado', payload)

    /// mandar mensajes a todos los usuarios ----
    //server.io.emit('mensaje-privado', payload)
    
    res.json({
        ok:true,
        mensaje: `${cuerpo} su id es ${ id}` 
    })
})


// obtener los id de los usuario via socket Io
router.get('/usuarios',( req : Request, res : Response)=>{

    const server = Server.Instance;
    server.io.sockets.clients((error :any, clientes : string[]) =>{

        if (error) {
           return  res.json({
                            ok:false,
                            mensaje:error
                        })
        }
        res.json({
            ok:true,
            clientes: clientes
        })
 
    });
})

// obtener los id y sus nombres----
router.get('/usuarios/detalle',( req : Request, res : Response)=>{

   // utilizamos la misma instancia creada en los sockets
   const user =  userConectados.getUsuarios();

   console.log('usuarios2')
   console.log(user)
    res.json({
        ok:true,
        clientes : user
    })
})
 

export default router;
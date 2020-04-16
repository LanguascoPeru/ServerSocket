import { Router, Request, Response	} from 'express';
import Server from '../classes/server';
import { userConectados } from '../sockets/sockets';
import { graficaData_BL } from '../classes/grafica';
 
 

const router = Router();

const objGrafica = new graficaData_BL();


router.get('/grafica',( req : Request, res : Response)=>{
    res.json(objGrafica.getDataGrafica());
})

//--- body 
// -- x-www-form-urlencoded
// body.cuerpo;
// body.de;
router.post('/grafica',( req : Request, res : Response)=>{

    const mes =  req.body.mes;
    const valor = Number(req.body.valor);

   const listaGrafico =  objGrafica.setIncrementarValor(mes, valor)

    const server = Server.Instance;
    server.io.emit('new-grafica', listaGrafico)
 
    res.json({
        ok:true,
        mensaje: listaGrafico
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
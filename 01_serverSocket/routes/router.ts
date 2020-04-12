import { Router, Request, Response	} from 'express';
import Server from '../classes/server';

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



 

export default router;
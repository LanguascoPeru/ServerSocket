

import { Router, Request, Response	} from 'express';
import Server from '../classes/server';
import { mapaBL } from '../sockets/sockets';
 
const router = Router();
router.get('/mapa',( req : Request, res : Response)=>{
     res.json( mapaBL.getMarcadores());
})



//--- body 
// -- x-www-form-urlencoded
// body.cuerpo;
// body.de;
// router.post('/encuesta',( req : Request, res : Response)=>{

//     const index = Number(req.body.pos.trim());
//     const voto = Number(req.body.voto.trim());

//     const server = Server.Instance;
//     const votos:any = objencuesta.getIncrementarEncuesta(index, voto); 

//     /// enviando los datos a todos los usuarios conectados al socket ---
//     server.io.emit('new-encuestas',votos )
    
//     res.json(votos);
 
// })

export default router;
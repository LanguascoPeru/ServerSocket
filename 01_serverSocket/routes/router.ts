import { Router, Request, Response	} from 'express';

const router = Router();

router.get('/mensajes',( req : Request, res : Response)=>{
    res.json({
        ok:true,
        mensaje: 'todo esta bien'
    })
})

//--- body 
// -- x-www-form-urlencoded
router.post('/mensajes',( req : Request, res : Response)=>{

    // body.cuerpo;
    // body.de;

    const cuerpo =  req.body.cuerpo;
    const de = req.body.de;
    
    res.json({
        ok:true,
        mensaje: cuerpo
    })
})



router.post('/mensajes/:id',( req : Request, res : Response)=>{

    const id = req.params.id;
    const cuerpo =  req.body.cuerpo;
    const de = req.body.de;


    
    res.json({
        ok:true,
        mensaje: `${cuerpo} su id es ${ id}` 
    })
})



 

export default router;
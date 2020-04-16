import { Usuario } from './usuario';
export class UsuarioBL {

    private listaUser:Usuario [] = [];

    constructor(){

    }

    public agregarUsuario(usuario:Usuario){
        this.listaUser.push(usuario);
        return usuario;
    }

    public actualizarNombre(id:string , nombre :string){
        for (let usuario of this.listaUser) {
            if (usuario.id == id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log(this.listaUser);
    }

    public getUsuarios(){
        return this.listaUser.filter( user => user.nombre !== 'sin nombre' );
       // return this.listaUser;
    }

    public getUsuario(id : string){
        return this.listaUser.find( user => user.id ===id);
    }

    public getUsuariosSala(sala: string){
        return this.listaUser.filter(usr => usr.sala === sala);
    }

    public borrarUsuario(id : string){

        const tempUsuario  = this.getUsuario( id );
        this.listaUser =  this.listaUser.filter(usr => usr.id !== id);
        return tempUsuario;
    }

}
export class Encuesta_BL {
 
    private pregunta:string[] = [];
    private votos:number[] = []

    constructor(){
        this.pregunta = ['pregunta 1','pregunta 2','pregunta 3','pregunta 4','pregunta 5'];
        this.votos = [1,1,1,1,1];
    }

    getEncuesta(){          
        return [
            { data: this.votos, label: 'Encuestas' },
          ];
    }

    getIncrementarEncuesta(pos:number, voto:number){
       for (let index = 0; index < this.pregunta.length; index++) {

            if (pos == index) {
                this.votos[index] += voto;
            }
            
        }

        return this.getEncuesta();
    }



}
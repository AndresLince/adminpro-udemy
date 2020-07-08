import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {    

    this.contarTres().then(
      mensaje=> console.log("termino",mensaje)
    ).catch(error=>
      console.error("Error en la promesa",error)
    );
  }

  ngOnInit(): void {
  }

  contarTres():Promise<any>{

    return new Promise((resolve,reject)=>{
      let contador=0;
      let Intervalo=setInterval(()=>{
        contador+=1;
        console.log(contador);
        if(contador===3){
          resolve("ok!");
          clearInterval(Intervalo);
        }
      },1000);
    });    
  }

}

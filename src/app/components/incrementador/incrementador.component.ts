import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso:number = 10;
  @Input('nombre') leyenda:string='Leyenda';

  @Output('actualizaValor') cambioValor:EventEmitter<number> = new EventEmitter();
  @ViewChild('txtProgress') txtProgress:ElementRef;

  constructor() {
    
  }

  ngOnInit(): void {
    
  }

  onChanges(newValue:number){

    
        
    if(newValue>=100){
      this.progreso=100;
    }else if(newValue<=0){
      this.progreso=0;
    }else{
      this.progreso=newValue;
    }

    this.txtProgress.nativeElement.value=this.progreso;

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor){

    if(this.progreso>=100 &&valor>=0){
      
      this.progreso=100;
      return;
    }
    if(this.progreso<=0 && valor<0){

      this.progreso=0;
      return;
    }
    this.progreso+=valor;

    this.txtProgress.nativeElement.focus();
    this.cambioValor.emit(this.progreso);
    
  }

}

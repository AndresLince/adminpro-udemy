import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService:UsuarioService,
    public router:Router
    ){

  }

  canActivate(){
    
    if(this._usuarioService.estaLogueado()){

      console.log('Paso por GUARD');
      return true;
    }else{

      console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }

    
  }
  
}

import { Router } from '@angular/router';
import swal from 'sweetalert';
import { URL_SERVICIOS } from './../../config/config';
import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { retry, map,filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token:string;

  constructor(
      public http: HttpClient,
      public router:Router     
    
    ) { 
    console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  
  guardarStorage(id:string,token:string,usuario:Usuario){

    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));

    this.usuario=usuario;
    this.token=token;
  }

  crearUsuario(usuario:Usuario){

    let url= URL_SERVICIOS+'/usuario';

    return this.http.post(url,usuario).pipe(
      map((resp:any)=>{
        swal('Usuario creado',usuario.email,'success');
        return resp.usuario;
      })
    );
  }

  loginGoogle(token:string){
    let url=URL_SERVICIOS+'/login/google';
    return this.http.post(url,{token}).pipe(
      map((resp:any)=>{

        this.guardarStorage(resp.id,resp.token,resp.usuario)
        return true;
      })
    )
  }

  estaLogueado(){

    return(this.token.length>5)?true:false;
  }

  logout(){
    
    this.usuario=null;
    this.token='';
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this.router.navigate(['/login']);
  }

  cargarStorage(){

    if(localStorage.getItem('token')){

      this.token=localStorage.getItem('token');
      this.usuario=JSON.parse(localStorage.getItem('usuario')); 
    }else{

      this.token='';
      this.usuario=null;
    }

  }

  login(usuario:Usuario,recordar=false){

    if(recordar){

      localStorage.setItem('email',usuario.email);
    }else{
      
      localStorage.removeItem('email');
    }
    let url=URL_SERVICIOS+'/login';
    return this.http.post(url,usuario).pipe(

      map((resp:any)=>{

        this.guardarStorage(resp.id,resp.token,resp.usuario)

        return true;
      })
    )
  }

}

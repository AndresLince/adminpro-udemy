import { element } from 'protractor';
import { Usuario } from './../models/usuario.model';
import { UsuarioService } from './../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame:boolean=false;
  email:string;
  auth2:any;

  constructor(public router:Router,public _usuarioService:UsuarioService) { }

  ngOnInit(): void {

    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email')||'';
    if(this.email.length>1){

      this.recuerdame=true;
    }
  }

  googleInit(){
    gapi.load('auth',()=>{
      this.auth2 = gapi.auth2.init({

        client_id:'366412109200-9jkdccdoj2qnrc5sa587gt24b9ij5u9l.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });

      this.attachSingin(document.getElementById('btnGoogle'));

    });
  }

  attachSingin(element){

    this.auth2.attachClickHandler(element,{},(googleUser)=>{

      //let profile=googleUser.getBasicProfile();
      let token=googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token).subscribe((resp)=>{
        window.location.href='#/dashboard';
      });
    })
  }


  ingresar(forma:NgForm){
    
    if(!forma.valid){

      return;
    }

    let usuario = new Usuario(null,forma.value.email,forma.value.password);

    this._usuarioService.login(usuario,forma.value.recuerdame).subscribe(correcto=>{
      
      this.router.navigate(['/dashboard']);
    });    
    
  }

}

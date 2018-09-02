import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";
import { NgZone } from "@angular/core";

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(
    private _route: Router,
    public _usuarioService: UsuarioService,
    public zone: NgZone
  ) {}

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario: Usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );
    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe(() => this._route.navigate(["/dashboard"]));
  }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem("email") || "";
    this.recuerdame = localStorage.getItem("email") ? true : false;
  }
 
  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "417292420632-ol6khps1ap1qgt865i0v0fjqggjh7qc8.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email"
      });
      this.attachSignIn(document.getElementById("btnGoogle"));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      //  let profile=googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      // this._usuarioService.loginGoogle(token).subscribe(resp => {
      //   window.location.href = "#/dashboard";
      // });
      this.zone.run(() => {
        this._usuarioService.loginGoogle(token).subscribe(resp => {
          this._route.navigate(["/dashboard"]);
        });
      });
    });
  }
}

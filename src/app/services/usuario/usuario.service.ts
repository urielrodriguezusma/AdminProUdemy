import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import swal from "sweetalert";
import { URL_SERVICIOS } from "../../config/config";
import { Usuario } from "../../models/usuario.model";
import { Router } from "@angular/router";
import { LoginComponent } from "../../login/login.component";

declare const gapi: any;

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  auth2: any;

  constructor(public _http: HttpClient, public _route: Router) {
    this.cargarStorage();
  }

  logout() {
    this.usuario = null;
    this.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this._route.navigate(["/login"]);

  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
    }
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";
    return this._http.post(url, { token: token }).pipe(
      map((resp: any) => {
        console.log("Logueado",resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "/login";
    return this._http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";
    return this._http.post(url, usuario).pipe(
      map((resp: any) => {
        swal("Usuario creado", usuario.email, "success");
        return resp.usuario;
      })
    );
  }
}

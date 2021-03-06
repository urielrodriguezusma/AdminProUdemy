import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import swal from "sweetalert";
import { URL_SERVICIOS } from "../../config/config";
import { Usuario } from "../../models/usuario.model";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";

declare const gapi: any;

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  auth2: any;
  menu: any[] = [];

  constructor(
    public _http: HttpClient,
    public _route: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + "/login/renuevatoken";
    return this._http.post(url, {}).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem("token", this.token);
        console.log("Token Renovado");
        return true;
      }),
      catchError(err => {
        this._route.navigate(['/login']);
        swal("Token", "No es posible renovar el token", "error");
        return throwError(err);
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("menu");
    this._route.navigate(["/login"]);
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      this.menu = [];
    }
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";
    return this._http.post(url, { token: token }).pipe(
      map((resp: any) => {
        console.log("Logueado", resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError(err => {
        console.log(err);
        swal("Error en el login", err.error.mensaje, "error");
        return throwError(err);
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";
    return this._http.post(url, usuario).pipe(
      map((resp: any) => {
        swal("Usuario creado", usuario.email, "success");
        return resp.usuario;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, "error");
        return throwError(err);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario/" + this.usuario._id;
    // let header = new HttpHeaders({
    //   token: this.token
    // });
    return this._http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }

        swal("usuario actualizado", usuario.nombre, "success");
        return true;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, "error");
        return throwError(err);
      })
    );
  }
  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, "usuarios", id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal("Imagen Actualizada", this.usuario.nombre, "success");
        this.guardarStorage(id, this.token, this.usuario, resp.menu);
      })
      .catch(err => {
        console.log(err);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + "/usuario?desde=" + desde;
    return this._http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/usuarios/" + termino;
    return this._http.get(url).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + "/usuario/" + id;
    return this._http.delete(url);
    // let header = new HttpHeaders({
    //   token: this.token
    // });

    // return this._http.delete(url, { headers: header });
  }
}

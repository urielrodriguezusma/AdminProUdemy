import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public _route: Router) {}
  canActivate(): boolean {
      if (this._usuarioService.estaLogueado()) {
        return true;
      } else {
        console.log("Bloqueado por el guard");
        this._route.navigate(["/login"]);
        return false;
      }
   
  }
}

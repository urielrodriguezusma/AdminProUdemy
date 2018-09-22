import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public route: Router) {}
  canActivate() {
    if (this._usuarioService.usuario.role === "ADMIN_ROLE") {
      return true;
    } else {
      console.log("Bloqueado por el Admin Guard");
      this._usuarioService.logout();
      return false;
    }
  }
}

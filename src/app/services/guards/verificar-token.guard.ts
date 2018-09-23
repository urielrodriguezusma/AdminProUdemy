import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class VerificarTokenGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService,
              public router:Router) {}
  canActivate(): Promise<boolean> | boolean {
    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split(".")[1]));

    let expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificarRenovacionToken(payload.exp);
  }

  verificarRenovacionToken(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000); //Como la vamos a comparar con la fecha
      //actual y la fecha exp viene en milisegundos lo multiplicamos por mil que sea en
      //segundos y poder compararla con la actual.

      let ahora = new Date();
      ahora.setTime(ahora.getTime() + 1 * 60 * 60 * 1000); //le asignamos a la fecha
      //actual 1 hora. Si quisieramos otro valor solo es cambiar el número 1

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            this.router.navigate(['/login']);
            reject(false);
          }
        );
      }
    });
  }

  expirado(fechaExpiracion: number): boolean {
    let ahora = new Date().getTime() / 1000; //Gettime nos lo arroja en milisegundos.
    //dividimos entre mil para que el resultado sea en segundos

    if (fechaExpiracion < ahora) {
      return true;
    } else {
      return false;
    }
  }
}

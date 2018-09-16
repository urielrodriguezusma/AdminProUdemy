import { Injectable } from "@angular/core";
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { UsuarioService } from "../services/service.index";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public _usuarioService: UsuarioService) {}
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this._usuarioService.token;

    if (idToken) {
      const header = new HttpHeaders({
        token: idToken
      });
      const clone = req.clone({
        headers: header
      }); 
      // const clone=req.clone({
      //   headers:req.headers.set("token",idToken)
      // });

      return next.handle(clone);
    } else {
      return next.handle(req);
    }
  }
}

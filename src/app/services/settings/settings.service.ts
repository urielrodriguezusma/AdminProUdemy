import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  ajustes: ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  };
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem("ajustes")) {
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
      this.aplicarTema(this.ajustes.tema);
    }
  }
  aplicarTema(tema: string) {
    let url = `assets/css/colors/${tema}.css`;
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this._document.getElementById("theme").setAttribute("href", url);
    this.guardarAjustes();
  }
}

interface ajustes {
  temaUrl: string;
  tema: string;
}

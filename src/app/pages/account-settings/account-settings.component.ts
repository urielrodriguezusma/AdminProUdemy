import { Component, OnInit, Inject, Renderer2 } from "@angular/core";
import { SettingsService } from "../../services/service.index";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(
    private _render2: Renderer2,
    public _ajusteService: SettingsService
  ) {} 

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this._ajusteService.aplicarTema(tema);
  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName("selector");
    for (let ref of selectores) {
      ref.classList.remove("working");
    }
    this._render2.addClass(link, "working");
    // link.classList.add("working");
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName("selector");
    let tema = this._ajusteService.ajustes.tema;
    for (let ref of selectores) {
      if (ref.getAttribute("data-theme") == tema) {
        ref.classList.add("working");
      }
    }
  }
}

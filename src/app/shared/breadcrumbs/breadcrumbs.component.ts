import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd, Data } from "@angular/router";
import { Title, Meta, MetaDefinition } from "@angular/platform-browser";

import { map, filter } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  tituloPagina: string = "";
  constructor(
    private _router: Router,
    private _title: Title,
    private _meta: Meta
  ) {
    this.getDataRoute().subscribe(event => {
      this.tituloPagina = event.titulo;
      this._title.setTitle(this.tituloPagina);

      const metaType: MetaDefinition = {
        name: "description",
        content: this.tituloPagina
      };
      this._meta.updateTag(metaType);

      this._meta.addTag({ name: "prueba", content: "prueba datos" });
      this._meta.addTags([
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:site", content: "@alligatorio" }
        ],
      );
      this._meta.updateTag({name: "twitterss:card", content: "Tarjeta" })
    });
  }
  getDataRoute(): Observable<Data> {
    return this._router.events.pipe(
      filter(evento => {
        if (evento instanceof ActivationEnd) {
          return true;
        } else {
          return false;
        }
      }),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild == null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }
  ngOnInit() {}
}

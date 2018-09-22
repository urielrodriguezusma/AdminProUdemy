import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { Usuario } from "../../models/usuario.model";
import { Medico } from "../../models/medico.model";
import { Hospital } from "../../models/hospital.model";

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styles: []
})
export class BusquedaComponent implements OnInit {
  terminoBusqueda: string;
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public activeRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router
  ) {
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      this.buscar(param.get("termino"));
    });
  }

  buscar(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/todo/" + termino;
    this.http.get(url).subscribe((resp: any) => {
      console.log(resp);
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuario;
    });
  }

  ngOnInit() {}
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";
import { Medico } from "../../models/medico.model";

@Injectable({
  providedIn: "root"
})
export class MedicoService {
  totalMedicos: number = 0;
  constructor(public _http: HttpClient) {}

  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICIOS + "/medico?desde=" + desde;
    return this._http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  buscarMedicos(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/medicos/" + termino;
    return this._http.get(url).pipe(map((resp: any) => resp.medicos));
  }

  borrarMedico(idMedico: string) {
    let url = URL_SERVICIOS + "/medico/" + idMedico;
    return this._http.delete(url);
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + "/medico";
    console.log("REGME", medico);
    if (medico._id) {
      //Actualizando
      url += "/" + medico._id;
      return this._http.put(url, medico).pipe(
        map((resp: any) => {
          swal("Registro Actualizado", `Medico actualizado`, "success");
          return resp.medico;
        })
      );
    } else {
      //Creando
      return this._http.post(url, medico).pipe(
        map((resp: any) => {
          swal(
            "Registro Almacenado",
            `Medico ${medico.nombre} creado`,
            "success"
          );
          return resp.medico;
        })
      );
    }
  }

  cargarMedicoById(id: string) {
    let url = URL_SERVICIOS + "/medico/" + id;
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp.medico;
      })
    );
  }
}

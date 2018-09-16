import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";
import { Hospital } from "../../models/hospital.model";

@Injectable({
  providedIn: "root"
})
export class HospitalService {
  totalRegistros: number;
  constructor(public _http: HttpClient) {}
  
  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + "/hospital?desde=" + desde;
    return this._http.get(url).pipe(
      map((resp: any) => {
        this.totalRegistros = resp.total;
        return resp.hospital;
      })
    );
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    return this._http.get(url);
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    return this._http.delete(url);
  }

  crearHospital(nombreHospital: string) {
    let url = URL_SERVICIOS + "/hospital";
    return this._http.post(url, nombreHospital).pipe(
      map((resp: any) => {
        swal(
          "Registro Almacenado",
          "El hospital ha sido creado correctamente.",
          "success"
        );
        return resp.hospital;
      })
    );
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/hospitales/" + termino;
    return this._http.get(url);
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + "/hospital/" + hospital._id;
    return this._http.put(url, hospital).pipe(
      map((resp: any) => {
        swal(
          "Registro Actualizado",
          "El hospital ha sido actualizado correctamente.",
          "success"
        );
        return resp;
      })
    );
  }
}

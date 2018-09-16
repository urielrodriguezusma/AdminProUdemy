import { Component, OnInit } from "@angular/core";
import { Hospital } from "../../models/hospital.model";
import { HospitalService } from "../../services/hospital/hospital.service";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";
// import swal from "sweetalert";

declare var swal: any;

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styles: []
})
export class HospitalesComponent implements OnInit {
  cargando: boolean = false;
  totalRegistros: Number = 0;
  desde: number = 0;
  hospitales: Hospital[] = [];

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(()=>
      this.cargarHospitales()
    );
  }

  cargarHospitales() {
    this._hospitalService
      .cargarHospitales(this.desde)
      .subscribe((hospitales: any) => {
        this.hospitales = hospitales;
        this.totalRegistros = this._hospitalService.totalRegistros;
        this.cargando = false;
      });
  }

  mostrarModal(idHospital: string) {
    this._modalUploadService.mostrarModal("hospitales", idHospital);
  }

  crearHospital(hospital: Hospital) {
    swal({
      title: "Crear Hospital",
      text: "Ingrese el nombre del hospital",
      content: "input",
      icon: "info",
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital(valor).subscribe(() => {
        swal(
          "Registro creado",
          "El hospital ha sido creado correctamente.",
          "success"
        );

        this.cargarHospitales();
      });

    });
  
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService
      .buscarHospital(termino)
      .subscribe((respHospitales: any) => {
        this.hospitales = respHospitales.hospitales;
        this.cargando = false;
      });
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }
  borrarHospital(hospital: Hospital) {
    swal({
      title: "Eliminar Registro",
      text:
        "¿Seguro que desea eliminar el registro del hospital " +
        hospital.nombre +
        "?",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._hospitalService
          .borrarHospital(hospital._id)
          .subscribe((borrado: boolean) => {
            console.log(borrado);
            this.desde =
              this.hospitales.length - 1 <= 0 ? this.desde - 5 : this.desde;
            this.cargarHospitales();
            swal(
              "Hospital Eliminado",
              "El hospital " +
                hospital.nombre +
                " ha sido eliminado correctamente",
              "success"
            );
          });
      }
    });
  }

  cambiarDesde(valor: number) {
    let valdesde = this.desde + valor;
    if (valdesde >= this.totalRegistros || valdesde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }
}

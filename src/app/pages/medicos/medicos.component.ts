import { Component, OnInit } from "@angular/core";
import { Medico } from "../../models/medico.model";
import { MedicoService } from "../../services/medico/medico.service";
import swal from 'sweetalert';

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde:number=0;
  totalMedicos:number=0;
  constructor(public _medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos(termino).subscribe(medicos => {
      this.medicos = medicos;
    });
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde).subscribe(medicos =>{
      this.medicos = medicos;
      this.totalMedicos=this._medicoService.totalMedicos;
    }); 
  }

  borrarMedico(medico: Medico) {
    swal({
      title: "Eliminar Registro",
      text:
        "¿Seguro que desea eliminar el registro del medico " +
        medico.nombre +
        "?",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._medicoService.borrarMedico(medico._id)
          .subscribe((borrado: boolean) => {
            this.desde = this.medicos.length - 1 <= 0 ? this.desde - 5 : this.desde;
            this.cargarMedicos();
            swal(
              "Medico Eliminado",
              "El medico " + medico.nombre + " ha sido eliminado correctamente",
              "success"
            );
          });
      }
    });
  }
  cambiarDesde(valor: number) {
    let valdesde = this.desde + valor;
    if (valdesde >= this.totalMedicos || valdesde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
  }
}

import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Hospital } from "../../models/hospital.model";
import { HospitalService } from "../../services/service.index";
import { Medico } from '../../models/medico.model';
import { MedicoService } from "../../services/medico/medico.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico("", "", "", "", "");

  hospital: Hospital = new Hospital("");

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public _modalUploadService:ModalUploadService,
    public router: Router,
    public activeRoute: ActivatedRoute
  ) {
    activeRoute.params.subscribe(params => {
      let id = params["id"];
      if (id !== "nuevo") {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService
      .cargarHospitales()
      .subscribe(hospitales => (this.hospitales = hospitales));

      this._modalUploadService.notificacion.subscribe((resp:any)=>{
        this.medico.img=resp.usuario.img;
      });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedicoById(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital=medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(["/medico", this.medico._id]);
    });
  }

  cambioHospital(id: string) {
    if (id == "") {
      return;
    }
    this._hospitalService
      .obtenerHospital(id)
      .subscribe((resp: any) => (this.hospital = resp.hospital));
  }

  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos',this.medico._id);
  } 
}

import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../services/service.index";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;

  totalRegistros: number = 0;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp=>this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("usuarios", id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let valdesde = this.desde + valor;
    if (valdesde >= this.totalRegistros || valdesde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal(
        "No puede borrar el usuario",
        "No se puede borrar a si mismo",
        "error"
      );
      return;
    }

    swal({
      title: "¿Esta seguro?",
      text: "Seguro que desea de borrar el usuario " + usuario.nombre + "!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._usuarioService
          .borrarUsuario(usuario._id)
          .subscribe((borrado: boolean) => {
            console.log(borrado);
            console.log(
              "Posicion",
              this.desde,
              "===>Cantidad ",
              this.usuarios.length
            );
            this.desde =
              this.usuarios.length - 1 <= 0 ? this.desde - 5 : this.desde;

            this.cargarUsuarios();
            swal(
              "Usuario Eliminado",
              "El usuario " +
                usuario.nombre +
                " ha sido eliminado correctamnte",
              "success"
            );
          });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}

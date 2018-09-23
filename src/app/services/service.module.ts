import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModalUploadService } from "../components/modal-upload/modal-upload.service";
import { AuthInterceptor } from "../pages/auth.interceptor";

//Servicios
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirArchivoService,
  LoginGuardGuard,
  VerificarTokenGuard,
  AdminGuard,
  MedicoService,
  HospitalService
} from "./service.index";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard,
    VerificarTokenGuard,
    AdminGuard,
    ModalUploadService,
    HospitalService,
    MedicoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  declarations: [
    
  ]
})
export class ServiceModule {}

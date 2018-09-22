import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { ProfileComponent } from './profile/profile.component';

//PIPES
import { PipesModule } from "../pipes/pipes.module";

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from "./pages.routes";
import { FormsModule } from '@angular/forms';

//Graficos
import { ChartsModule } from 'ng2-charts';


import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent} from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




@NgModule({
  declarations: [
      PagesComponent,
      DashboardComponent, 
      ProgressComponent, 
      Graficas1Component,
      IncrementadorComponent,
      GraficaDonaComponent,
      AccountSettingsComponent,
      PromesasComponent, 
      RxjsComponent,
      ProfileComponent,
      UsuariosComponent,
      ModalUploadComponent,
      HospitalesComponent,
      MedicosComponent,
      MedicoComponent,
      BusquedaComponent
    ],
    imports:[
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ChartsModule,
      CommonModule,
      PipesModule
    ],
  exports: [  
    PagesComponent,
    DashboardComponent, 
    ProgressComponent, 
    Graficas1Component,
    GraficaDonaComponent,
    MedicoComponent
  ]
})
export class PagesModule {}

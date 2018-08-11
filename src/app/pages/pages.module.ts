import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';


import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from "./pages.routes";
import { FormsModule } from '@angular/forms';

//Graficos
import { ChartsModule } from 'ng2-charts';

//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


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
      RxjsComponent
    ],
    imports:[
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ChartsModule
    ],
  exports: [  
    PagesComponent,
    DashboardComponent, 
    ProgressComponent, 
    Graficas1Component,
    GraficaDonaComponent
  ]
})
export class PagesModule {}

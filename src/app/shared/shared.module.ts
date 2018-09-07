import { NgModule } from "@angular/core";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports:[
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
      SidebarComponent,
      HeaderComponent,
      BreadcrumbsComponent,
      NopagefoundComponent
    ],
  exports: [
      SidebarComponent,
      HeaderComponent, 
      BreadcrumbsComponent,
      NopagefoundComponent
    ]
})
export class SharedModule {}

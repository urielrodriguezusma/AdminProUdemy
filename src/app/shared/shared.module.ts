import { NgModule } from "@angular/core";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";

@NgModule({
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

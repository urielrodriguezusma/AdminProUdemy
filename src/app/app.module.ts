import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//Routes
import { APP_ROUTES } from './app.routes';
import { RegisterComponent } from './login/register.component';

//modulos
import { PagesModule } from './pages/pages.module';

//Temporales
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Servicios
import { ServiceModule } from './services/service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    APP_ROUTES
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

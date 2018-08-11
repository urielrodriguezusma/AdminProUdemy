import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  suscripcion: Subscription;

  constructor() {
    this.suscripcion = this.regresaObservable()
      .pipe(retry(3))
      .subscribe(
        numero => console.log("sus", numero),
        error => console.error("Error en el obs", error),
        () => console.log("El observaror termino")
      );
  }
  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        const resultado = {
          valor: contador
        };

        observer.next(resultado);
        // if (contador == 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
      }, 1000);
    }).pipe(
      map(data => data.valor),
      filter((valor, index) => {
        return valor % 2 != 0 ? true : false;
      })
    );
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }
  ngOnInit() {}
}

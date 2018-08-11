import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTresSegundos()
      .then(() => console.log("Termino bien"))
      .catch(error => console.error("Error en la promesa", error));
  }

  contarTresSegundos():Promise<string> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve("Todo muy bien");
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

  ngOnInit() {}
}

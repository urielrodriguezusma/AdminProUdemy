import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() porcentaje: number = 50;
  @Input() leyenda: string = "leyenda";
  @Output() incrementarValor: EventEmitter<number> = new EventEmitter();
  @ViewChild("txtProgress") txtProgress: ElementRef;

  constructor() {}

  ngOnInit() {}

  onChanges(newValue: number) {
    //let elementHtml: any = document.getElementsByName("porcentaje")[0];
    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }
    this.txtProgress.nativeElement.value = this.porcentaje;
    
    this.incrementarValor.emit(this.porcentaje);
  }

  incrementar() {
    console.log(this.txtProgress);
    if (this.porcentaje < 100) {
      this.porcentaje += 5;
      this.incrementarValor.emit(this.porcentaje);
      this.txtProgress.nativeElement.focus();
    }
  }
  decrementar() {
    console.log(this.txtProgress);
    if (this.porcentaje > 0) {
      this.porcentaje -= 5;
      this.incrementarValor.emit(this.porcentaje);
      this.txtProgress.nativeElement.focus();
    }
  }
}

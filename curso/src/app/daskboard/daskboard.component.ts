import { Component } from '@angular/core';
import { HomeComponent } from '../main';
import { DemosComponent } from '../demos/demos.component';
import GraficoSvgComponent from 'src/lib/independientes/grafico-svg/grafico-svg.component';

@Component({
  selector: 'app-daskboard',
  templateUrl: './daskboard.component.html',
  styleUrls: ['./daskboard.component.css']
})
export class DaskboardComponent {
  menu = [
    { texto: 'inicio', icono: '', componente: HomeComponent },
    { texto: 'demos', icono: '', componente: DemosComponent },
    { texto: 'grafico', icono: '', componente: GraficoSvgComponent },
  ]
  actual: any = this.menu[0].componente

  selecciona(index: number) {
    this.actual = this.menu[index].componente
  }
}

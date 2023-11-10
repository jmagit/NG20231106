import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService, NotificationType } from '../common-services';
import { Unsubscribable } from 'rxjs';
import { ElipsisPipe } from '@my/core';
import { ElipsisPipe as ElipsisPipe_1, CapitalizePipe } from '../../lib/my-core/pipes/cadenas.pipe';
import { SizerComponent } from '../../lib/my-core/components/sizer.component';
import { FormButtonsComponent } from '../common-component/form-buttons/form-buttons.component';
import { CardComponent } from '../common-component/card.component';
import { TypeValidator } from '../../lib/my-core/directives/mis-validadores.directive';
import { NgFor, NgIf, NgClass, UpperCasePipe, JsonPipe, SlicePipe, DecimalPipe, TitleCasePipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculadoraComponent } from '../calculadora/calculadora.component';

@Component({
    selector: 'app-demos',
    templateUrl: './demos.component.html',
    styleUrls: ['./demos.component.css'],
    standalone: true,
    imports: [
        CalculadoraComponent,
        FormsModule,
        NgFor,
        TypeValidator,
        CardComponent,
        FormButtonsComponent,
        NgIf,
        NgClass,
        SizerComponent,
        UpperCasePipe,
        JsonPipe,
        SlicePipe,
        DecimalPipe,
        TitleCasePipe,
        CurrencyPipe,
        DatePipe,
        ElipsisPipe_1,
        CapitalizePipe,
    ],
})
export class DemosComponent implements OnInit, OnDestroy {
  private suscriptor: Unsubscribable | undefined;
  private nombre: string = 'mundo'
  fecha = '2023-11-07'
  fontSize = 24
  listado = [
    { id: 1, nombre: 'Madrid'},
    { id: 2, nombre: 'BARCELONA'},
    { id: 3, nombre: 'valencia'},
    { id: 4, nombre: 'ciudad Real'},
  ]
  idProvincia = 2

  resultado?: string
  visible = true
  estetica = { importante: true, urgente: true, error: false }

  constructor(public vm: NotificationService) { }

  public get Nombre(): string { return this.nombre }
  public set Nombre(value: string ) {
    if(value === this.nombre) return
    this.nombre = value
  }

  public saluda(): void {
    const pipe = new ElipsisPipe();

    this.resultado = `Hola ${pipe.transform(this.nombre, 10)}`
  }
  public despide(): void {
    this.resultado = `Adios ${this.nombre}`
  }
  public di(algo: string): void {
    this.resultado = `Dice ${algo}`
  }

  cambia() {
    this.visible = !this.visible
    this.estetica.importante = !this.estetica.importante
    this.estetica.error = !this.estetica.error
  }

  calcula(a: number, b: number): number {
    console.info('calcula')
    return a + b
  }

  add(provincia: string) {
    const id = this.listado[this.listado.length - 1].id + 1
    this.listado.push({ id, nombre: provincia})
    this.idProvincia = id
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // this.suscriptor = this.vm.Notificacion.subscribe(n => {
    //   if (n.Type !== NotificationType.error) { return; }
    //   window.alert(`Suscripcion: ${n.Message}`);
    //   this.vm.remove(this.vm.Listado.length - 1);
    // });
  }
  ngOnDestroy(): void {
    if (this.suscriptor) {
      this.suscriptor.unsubscribe();
    }
  }

  idiomas = [
    { codigo: 'en-US', region: 'USA' },
    { codigo: 'es', region: 'España' },
    { codigo: 'pt', region: 'Portugal' },
  ];
  idioma = this.idiomas[0].codigo;
  calculos: any[] = [];
  valCalculadora = 666;

  ponResultado(origen: string, valor: any) {
    this.calculos.push({
      pos: this.calculos.length + 1,
      origen,
      valor
    });
  }

}

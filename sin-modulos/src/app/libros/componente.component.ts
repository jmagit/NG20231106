/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf, NgFor } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TypeValidator, ErrorMessagePipe } from '@my/core';
import { FormButtonsComponent } from '../common-component';
import { LibrosViewModelService } from './servicios.service';

@Component({
    selector: 'app-libros',
    templateUrl: './tmpl-anfitrion.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [
        NgSwitch,
        NgSwitchCase,
        forwardRef(() => LibrosAddComponent),
        forwardRef(() => LibrosEditComponent),
        forwardRef(() => LibrosViewComponent),
        NgSwitchDefault,
        forwardRef(() => LibrosListComponent),
    ],
})
export class LibrosComponent implements OnInit, OnDestroy {
  constructor(protected vm: LibrosViewModelService, private route: ActivatedRoute) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit() {
      const id = this.route.snapshot.params['id'];
      if (id) {
        if (this.route.snapshot.url.slice(-1)[0]?.path === 'edit') {
          this.vm.edit(+id);
        } else {
          this.vm.view(+id);
        }
      } else if (this.route.snapshot.url.slice(-1)[0]?.path === 'add') {
        this.vm.add();
      } else {
        this.vm.load();
      }
    }
    ngOnDestroy(): void { this.vm.clear(); }
}

@Component({
    selector: 'app-libros-list',
    templateUrl: './tmpl-list.sin-rutas.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink, NgFor, PaginatorModule]
})
export class LibrosListComponent implements OnInit, OnDestroy {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void {}
  ngOnDestroy(): void { }
}
@Component({
    selector: 'app-libros-add',
    templateUrl: './tmpl-form.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [FormsModule, TypeValidator, FormButtonsComponent, ErrorMessagePipe]
})
export class LibrosAddComponent implements OnInit {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void { }
}
@Component({
    selector: 'app-libros-edit',
    templateUrl: './tmpl-form.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [FormsModule, TypeValidator, FormButtonsComponent, ErrorMessagePipe]
})
export class LibrosEditComponent implements OnInit, OnDestroy {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}
@Component({
    selector: 'app-libros-view',
    templateUrl: './tmpl-view.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [RouterLink, FormButtonsComponent]
})
export class LibrosViewComponent implements OnInit, OnDestroy {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}

/*
@Component({
  selector: 'app-libros-list',
  templateUrl: './tmpl-list.con-rutas.component.html',
  styleUrls: ['./componente.component.css']
})
export class LibrosListComponent implements OnChanges, OnDestroy {
  @Input() page = 0

  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  // ngOnInit(): void {
  //   // this.vm.list();
  //   this.vm.load()
  // }
  ngOnChanges(changes: SimpleChanges): void {
    this.vm.load(this.page)
  }
  ngOnDestroy(): void { this.vm.clear(); }
}
@Component({
  selector: 'app-libros-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css']
})
export class LibrosAddComponent implements OnInit {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.add();
  }
}
@Component({
  selector: 'app-libros-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css']
})
export class LibrosEditComponent implements OnInit, OnDestroy {
  private obs$: any;
  constructor(protected vm: LibrosViewModelService,
    protected route: ActivatedRoute, protected router: Router) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void {
    this.obs$ = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = parseInt(params?.get('id') ?? '');
        if (id) {
          this.vm.edit(id);
        } else {
          this.router.navigate(['/404.html']);
        }
      });
  }
  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }
}
@Component({
  selector: 'app-libros-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./componente.component.css']
})
export class LibrosViewComponent implements OnChanges {
  @Input() id?: string;
  constructor(protected vm: LibrosViewModelService, protected router: Router) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) {
      this.vm.view(+this.id);
    } else {
      this.router.navigate(['/404.html']);
    }
  }
}
*/

export const LIBROS_COMPONENTES = [
  LibrosComponent, LibrosListComponent, LibrosAddComponent,
  LibrosEditComponent, LibrosViewComponent,
];

import { Routes, UrlSegment } from '@angular/router';
import { HomeComponent, PageNotFoundComponent } from './main';
import { DemosComponent } from './demos/demos.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ContactosAddComponent, ContactosEditComponent, ContactosListComponent, ContactosViewComponent } from './contactos';
import { AuthCanActivateFn, AuthWithRedirectCanActivate, InRoleCanActivateChild, LoginFormComponent, RegisterUserComponent } from './security';
// import { LibrosComponent } from './libros';
// import GraficoSvgComponent from 'src/lib/independientes/grafico-svg/grafico-svg.component';

export function svgFiles(url: UrlSegment[]) {
  return url.length === 1 && url[0].path.endsWith('.svg') ? ({ consumed: url }) : null;
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'demos', component: DemosComponent, canActivate: [ AuthWithRedirectCanActivate('/login') ] },
  { path: 'chisme/de/hacer/numeros', component: CalculadoraComponent, title: 'Calculadora', canActivate: [ AuthCanActivateFn] },
  { path: 'contactos', component: ContactosListComponent },
  { path: 'contactos/add', component: ContactosAddComponent },
  { path: 'contactos/:id/edit', component: ContactosEditComponent },
  { path: 'contactos/:id', component: ContactosViewComponent },
  { path: 'contactos/:id/:kk', component: ContactosViewComponent },
  { path: 'alysia/baxendale', redirectTo: '/contactos/43' },
  // { path: 'libros', children: [
  //   { path: '', component: LibrosComponent },
  //   { path: 'add', component: LibrosComponent },
  //   { path: ':id/edit', component: LibrosComponent },
  //   { path: ':id', component: LibrosComponent },
  //   { path: ':id/:kk', component: LibrosComponent },
  // ]},
  // { matcher: svgFiles, component: GraficoSvgComponent },
  { matcher: svgFiles, loadComponent: () => import('../lib/independientes/grafico-svg/grafico-svg.component') },
  { path: 'libros', loadChildren: () => import('./libros/modulo.module').then(mod => mod.LibrosModule), canActivateChild: [ InRoleCanActivateChild('Empleados') ] },
  { path: 'config', loadChildren: () => import('./config/config.module') },
  { path: 'login', component: LoginFormComponent },
  { path: 'registro', component: RegisterUserComponent },
  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404.html' }
];

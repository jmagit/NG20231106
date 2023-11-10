import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routes';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthInterceptor } from './app/security';
import { AjaxWaitInterceptor } from './app/main/ajax-wait';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { environment } from 'src/environments/environment';
import { LoggerService, ERROR_LEVEL } from '@my/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule),
        LoggerService,
        { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL },
        // { provide: LOCALE_ID, useValue: 'es-ES' },
        { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd/MMM/yy' } },
        { provide: HTTP_INTERCEPTORS, useClass: AjaxWaitInterceptor, multi: true, },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes, withComponentInputBinding())
    ]
})
  .catch(err => console.error(err));

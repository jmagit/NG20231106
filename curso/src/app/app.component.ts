import { Component } from '@angular/core';
import { LoggerService } from '@my/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'curso';

  constructor(out: LoggerService) {
    out.error('Es un error')
    out.warn('Es un warn')
    out.info('Es un info')
    out.log('Es un log')
  }
}

import { Component } from '@angular/core';
import { LoggerService } from '@my/core';
import { NotificationService, NotificationType } from '../../common-services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'curso';

  // constructor(out: LoggerService) {
  //   out.error('Es un error')
  //   out.warn('Es un warn')
  //   out.info('Es un info')
  //   out.log('Es un log')
  // }

  // constructor(private notify: NotificationService) {}
  // ngOnInit(): void {
  //   this.notify.add('Arranca la aplicación', NotificationType.info)
  // }

}

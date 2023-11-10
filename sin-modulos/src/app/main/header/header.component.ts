import { Component } from '@angular/core';
import { AuthService, LoginComponent } from 'src/app/security';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgIf, LoginComponent]
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
}

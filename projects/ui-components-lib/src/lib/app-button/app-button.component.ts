import { Component, ViewEncapsulation } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  imports: [ButtonModule],
  selector: 'app-button',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './app-button.component.scss',
  templateUrl: './app-button.component.html',
})
export class AppButtonComponent extends Button {}

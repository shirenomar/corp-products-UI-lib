import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Button, ButtonModule, ButtonStyle } from 'primeng/button';

@Component({
  imports: [ButtonModule],
  selector: 'app-button',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-button.component.html',
  providers: [ButtonStyle],
})
export class AppButtonComponent extends Button {}

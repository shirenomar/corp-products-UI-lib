import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppButtonComponent } from '@corp-products/ui-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , RouterModule , AppButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}

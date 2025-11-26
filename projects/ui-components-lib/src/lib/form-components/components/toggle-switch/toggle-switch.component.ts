import { Component } from '@angular/core';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { ToggleSwitch, ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'stc-toggle-switch',
  imports: [ToggleSwitchModule, ɵInternalFormsSharedModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
})
export class ToggleSwitchComponent extends ToggleSwitch {}

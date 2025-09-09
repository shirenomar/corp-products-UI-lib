import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppButtonIconPos, AppButtonSeverity, AppButtonSize, AppButtonVariant } from './app-button';

@Component({
  imports: [RouterModule, ButtonModule, CommonModule],
  selector: 'app-button',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './app-button.component.scss',
  templateUrl: './app-button.component.html',
})
export class AppButtonComponent {
  @Input() title!: string;
  @Input() class: string;
  @Input() icon: string;
  @Input() size: AppButtonSize;
  @Input() severity!: AppButtonSeverity;
  @Input() iconPos: AppButtonIconPos;
  @Input() variant: AppButtonVariant;
  @Input() disabled = false;
  @Input() text = false;
  @Input() rounded = false;

  @Output() clickEmitter = new EventEmitter<void>();
}

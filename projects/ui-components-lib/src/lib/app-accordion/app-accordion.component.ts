import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IcoMoonIconComponent } from '../ico-moon-icon/ico-moon-icon.component';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: "app-accordion",
  standalone: true,
  imports: [CommonModule, DividerModule, AccordionModule, IcoMoonIconComponent],
  templateUrl: "./app-accordion.component.html",
  styleUrl: "./app-accordion.component.scss"
})
export class AppAccordionComponent {
  @Input() iconName!: string;
  @Input() iconClass!: string;
  @Input() iconPathCount = 0;
  @Input({required: true}) title!: string;
  @Input() contentBorderTop: boolean = true;
  @Input() accordionPanelBorder: boolean = true;
}

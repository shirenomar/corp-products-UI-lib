import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from "@angular/forms";

@Component({
  selector: "stc-switch",
  standalone: true,
  imports: [CommonModule, ToggleSwitchModule, FormsModule],
  templateUrl: "./switch.component.html",
  styleUrl: "./switch.component.scss"
})
export class SwitchComponent {
  @Input() label: string;
  @Input() key: string;
  @Input() checked: boolean = false;
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  // checked: boolean = false;

  sendUpdatedValue(value: any) {
    if (value) {
      this.onChange.emit(value.checked);
    }
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { AppButtonComponent } from "../app-button";

@Component({
  selector: "app-user-autocomplete-card",
  standalone: true,
  imports: [AppButtonComponent],
  templateUrl: "./user-autocomplete-card.component.html",
  styleUrl: "./user-autocomplete-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAutocompleteCardComponent {
  @Output() select = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Input({ required: true }) userData: any;
  @Input() explicitRole = "";
  @Input() showDeleteAction = true;
  onDelete() {
    this.delete.emit(this.userData);
  }
}

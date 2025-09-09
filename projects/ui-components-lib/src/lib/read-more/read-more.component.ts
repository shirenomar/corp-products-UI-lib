import { Component, Input } from "@angular/core";
import {SlicePipe} from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-read-more",
  standalone: true,
  imports: [TranslateModule, SlicePipe],
  templateUrl: "./read-more.component.html",
  styleUrl: "./read-more.component.scss"
})
export class ReadMoreComponent {
  @Input({ required: true }) text = "";
  @Input() styleClass = "";
  @Input() maxCharacters = 100;
  isExpanded = false;

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }
}

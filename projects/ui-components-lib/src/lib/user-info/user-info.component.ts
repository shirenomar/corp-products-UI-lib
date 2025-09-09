import { Component, Input } from "@angular/core";

@Component({
  selector: "user-info",
  templateUrl: "./user-info.component.html",
  standalone: true
})
export class UserInfoComponent {
  @Input() profileImage: string;
  @Input() name: string;
}

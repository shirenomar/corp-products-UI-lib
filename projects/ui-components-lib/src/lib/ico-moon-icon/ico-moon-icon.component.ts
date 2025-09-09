import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-ico-moon-card',
  standalone: true,
  template:`
    <i [class]="iconName + ' ' + iconClass">
      @for (path of getPathCount; track $index) {
        <i [class]="iconName + ' path'+path"></i>
      }
    </i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IcoMoonIconComponent {
  @Input({ required: true }) iconName!: string;
  @Input() iconClass!: string;
  @Input() iconPathCount = 0;

  get getPathCount() {
    return Array.from({ length: this.iconPathCount }, (_, i) => i + 1);
  }
}

import { Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
  DynamicDialogStyle,
} from 'primeng/dynamicdialog';
import { AppButtonComponent } from '../app-button';
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [AppButtonComponent, AvatarModule, DynamicDialogModule, TranslatePipe],
  providers: [DynamicDialogStyle],
})
export class AlertDialogComponent extends DynamicDialogRef implements OnInit {
  private readonly router = inject(Router);
  readonly dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _ref = inject(DynamicDialogRef);

  ngOnInit() {
    this.router.events.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      //if (this.dynamicDialogConfig) {
      //  this._ref.close(false);
      //}
    });
  }

  override close() {
    this._ref.close(false);
  }
}

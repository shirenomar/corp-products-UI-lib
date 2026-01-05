import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
  DynamicDialogStyle,
} from 'primeng/dynamicdialog';
import { filter, Subscription } from 'rxjs';
import { AppButtonComponent } from '../app-button';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    AppButtonComponent,
    AvatarModule,
    DynamicDialogModule,
    TranslatePipe,
  ],
  providers: [DialogService, DynamicDialogStyle],
})
export class AlertDialogComponent extends DynamicDialogRef implements OnInit, OnDestroy {
  router = inject(Router);
  dialogService = inject(DialogService);
  dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _subscription = new Subscription();

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit() {
    this._subscription.add(
      this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe(() => {
        if (this.dynamicDialogConfig) {
          this._ref.close(false);
        }
      })
    );
  }

  override close() {
    this._ref.close(false);
  }
}

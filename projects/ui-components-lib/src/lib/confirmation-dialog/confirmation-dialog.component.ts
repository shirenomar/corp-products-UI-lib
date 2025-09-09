import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { filter, Subscription } from 'rxjs';
import { AppButtonComponent } from '../app-button/app-button.component';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { DynamicFormData } from '../dynamic-form/dynamic-form.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  standalone: true,
  imports: [
    AppButtonComponent,
    AvatarModule,
    DynamicDialogModule,
    DynamicFormComponent,
    TranslatePipe,
  ],
  providers: [DialogService],
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  router = inject(Router);
  dialogService = inject(DialogService);
  dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _subscription = new Subscription();
  dialogFormData: DynamicFormData;

  ngOnInit() {
    // closing when navigating back from the browser
    this._subscription.add(
      this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe(() => {
        if (this.dynamicDialogConfig) {
          this._ref.close();
        }
      })
    );
    this.dialogFormData = this.dynamicDialogConfig.data?.inputForm;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  submit() {
    const submitData = { submitted: true, data: this.dialogFormData?.formGroup?.value };
    this._ref.close(this.dynamicDialogConfig.data.inputForm ? submitData : true);
  }

  close() {
    this._ref.close();
  }
}

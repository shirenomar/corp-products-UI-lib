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
import { AppButtonComponent } from '../app-button/app-button.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { DynamicFormData } from '../dynamic-form/dynamic-form.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    AppButtonComponent,
    AvatarModule,
    DynamicDialogModule,
    DynamicFormComponent,
    TranslatePipe,
  ],
  providers: [DialogService, DynamicDialogStyle],
})
export class ConfirmationDialogComponent extends DynamicDialogRef implements OnInit, OnDestroy {
  router = inject(Router);
  dialogService = inject(DialogService);
  dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _subscription = new Subscription();
  dialogFormData: DynamicFormData;
  uploadedFile: any;

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  ngOnInit() {
    // closing when navigating back from the browser
    this._subscription.add(
      this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe(() => {
        if (this.dynamicDialogConfig) {
          this._ref.close(false);
        }
      })
    );
    this.dialogFormData = this.dynamicDialogConfig.data?.inputForm;
  }
  submit() {
    // we should pass submitted data when using form dialog
    // const submitData = { submitted: true, data: this.dialogFormData?.formGroup?.value };
    // this._ref.close(this.dynamicDialogConfig.data.inputForm ? submitData : true);
    debugger
    if(this.uploadedFile) {
      this._ref.close({isSubmitted: true, file: this.uploadedFile});

    } else {
      this._ref.close(true);
    }
  }

  override close() {
    this._ref.close(false);
  }
  onPopFilesUploaded(file: any) {
    debugger
    this.uploadedFile = file
  }
  onFileDeleted(file: any) {
  }
}

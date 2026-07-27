import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
import { DynamicFormData, FileUploadState, FormFieldTypeEnum } from '../dynamic-form/dynamic-form.interface';

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
  documentId: string | null = null;
  uploadState: FileUploadState = { isUploading: false, documentId: null, hasFile: false };

  get hasFileUpload(): boolean {
    return !!this.dialogFormData?.fileUpload || this.hasFileUploadField();
  }

  hasFileUploadField(): boolean {
    const inputsMap = this.dialogFormData?.inputsMap ?? {};
    return Object.values(inputsMap).some(
      (field) => field.fieldType === FormFieldTypeEnum.UPLOAD_FILE && !!field.fileUpload?.uploadFn
    );
  }

  get isConfirmDisabled(): boolean {
    if (this.dialogFormData?.formGroup?.invalid) {
      return true;
    }
    if (this.uploadState.isUploading) {
      return true;
    }
    return false;
  }

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

    const inputForm = this.dynamicDialogConfig.data?.inputForm;
    const fileUpload = inputForm?.fileUpload ?? this.dynamicDialogConfig.data?.fileUpload;

    this.dialogFormData = {
      ...inputForm,
      formGroup: inputForm?.formGroup ?? new FormGroup({}),
      inputsMap: inputForm?.inputsMap ?? {},
      fileUpload,
    };
  }

  submit() {
    if (this.documentId) {
      this._ref.close({
        isSubmitted: true,
        documentId: this.documentId,
        data: this.dialogFormData?.formGroup?.value,
      });
    } else if (this.uploadedFile) {
      this._ref.close({ isSubmitted: true, file: this.uploadedFile });
    } else {
      this._ref.close(true);
    }
  }

  override close() {
    this._ref.close(false);
  }

  onPopFilesUploaded(file: any) {
    if (file?.documentId) {
      this.documentId = file.documentId;
    } else {
      this.uploadedFile = file;
    }
  }

  onFileDeleted() {
    this.documentId = null;
    this.uploadedFile = null;
  }

  onUploadStateChange(state: FileUploadState) {
    this.uploadState = state;
    if (state.documentId) {
      this.documentId = state.documentId;
    }
  }
}

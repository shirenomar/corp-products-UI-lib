import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
export interface ConfirmationDialogData {
  header: string;
  message: string;
  confirmBtnId: string;
  cancelBtnId: string;
  mainIcon?: string;
  cancelBtnLabel?: string;
  confirmBtnLabel?: string;
  confirmBtnIcon?: string;
  confirmBtnPosition?: string;
  hint?: string;
  inputForm?: any;
}
@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  constructor(private dialogService: DialogService) {}

  open(data: ConfirmationDialogData): Observable<boolean> {
    const ref: DynamicDialogRef = this.dialogService.open(ConfirmationDialogComponent, {
      data,
      header: '',
      showHeader: false,
      style: { 'max-width': '570px', width: '100%'},
      closable: false
    });

    // Emit true/false when dialog closes
    return ref.onClose.pipe(
      filter(res => res !== undefined),
      map(res => !!res)
    );
  }


}

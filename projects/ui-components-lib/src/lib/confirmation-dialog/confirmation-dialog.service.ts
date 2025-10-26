import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogData } from './confirmation-dialog.interface';

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

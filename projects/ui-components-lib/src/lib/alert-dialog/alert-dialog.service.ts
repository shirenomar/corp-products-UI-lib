import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AlertDialogComponent } from './alert-dialog.component';
import { AlertDialogData } from './alert-dialog.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertDialogService {
  private readonly dialogService = inject(DialogService);

  open(data: AlertDialogData): Observable<boolean> {
    const ref: DynamicDialogRef | null = this.dialogService.open(AlertDialogComponent, {
      data,
      header: data.header,
      showHeader: true,
      width: '600px',
      closable: true,
      modal: true,
      styleClass: 'alert-dialog-wrapper',
    });
    if (!ref) {
      return of(false); // or EMPTY / throwError — depending on your logic
    }
    // Emit true/false when dialog closes
    return ref.onClose.pipe(
      filter((res) => res !== undefined),
      map((res) => !!res)
    );
  }
}

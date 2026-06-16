import {
  Component,
  EventEmitter,
  input,
  OnDestroy,
  Output,
  signal,
  ViewChild,
  ElementRef,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { finalize, Observable, Subscription } from 'rxjs';

import { FileSizePipe } from './pipes';
import {
  Attachment,
  AttachmentFile,
  FileItem,
  FileUploadResponse,
  FileUploadState,
  UploadStatus,
} from './interfaces/file.interface';
import { BaseInputComponent } from '../form-components/components/base-input.component';

@Component({
  selector: 'app-file-management',
  imports: [CommonModule, TranslatePipe, ButtonModule, TooltipModule, FileSizePipe, ProgressBar],
  templateUrl: './file-management.component.html',
  styleUrl: './file-management.component.scss',
})
export class FileManagementComponent extends BaseInputComponent implements OnDestroy {
  existingFiles = input<AttachmentFile[]>([]);
  acceptedTypes = input<string>('*');
  maxFileSize = input<number>(10485760);
  maxConcurrentUploads = input<number>(3);
  showTable = input<boolean>(true);
  showDropZone = input<boolean>(true);
  allowPreview = input<boolean>(true);
  permissonKey = input<string>('');
  allowedActions = input<string[]>([]);
  uploadFn = input<((file: File) => Observable<FileUploadResponse>) | undefined>(undefined);

  @Output() filesUploaded = new EventEmitter<any>();
  @Output() fileDeleted = new EventEmitter<{ fileId: string; isNew: boolean }>();
  @Output() filePreview = new EventEmitter<FileItem>();
  @Output() fileDownload = new EventEmitter<FileItem>();
  @Output() uploadError = new EventEmitter<{ file: File; error: string }>();
  @Output() newFilesChange = new EventEmitter<FileItem[]>();
  @Output() uploadStateChange = new EventEmitter<FileUploadState>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  uploadedFile = signal<File[]>([]);
  isDragOver = signal(false);
  newFiles = signal<FileItem[]>([]);
  documentId: string | null = null;
  uploadErrorMessage: string | null = null;

  uploadedResponses: AttachmentFile[] = [];
  readonly UploadStatus = UploadStatus;
  private readonly _subscription = new Subscription();
  private progressIntervals = new Map<string, ReturnType<typeof setInterval>>();

  allFiles = computed<FileItem[]>(() => {
    const existing = this.existingFiles().map((f) => ({
      ...f,
      status: undefined,
      isNew: false,
    }));
    return [...this.newFiles(), ...existing];
  });

  uploadedNewFileIds = computed(() => {
    return this.newFiles()
      .filter((f) => f.status === UploadStatus.SUCCESS && f.id && !f.id.startsWith('temp-'))
      .map((f) => f.id);
  });

  formattedAcceptedTypes = computed<string>(() => {
    const accepted = this.acceptedTypes();
    if (accepted === '*' || accepted === '*/*') return '';

    return accepted
      .split(',')
      .map((type) => type.trim().replace('.', '').toUpperCase())
      .join(', ');
  });

  override ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this.progressIntervals.forEach((interval) => clearInterval(interval));
    this.progressIntervals.clear();
    super.ngOnDestroy();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      this.handleFiles(Array.from(droppedFiles));
    }
  }

  onBrowseClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
      input.value = '';
    }
  }

  triggerFileInput(): void {
    this.fileInput?.nativeElement?.click();
  }

  appendFileFromParent(file: File): void {
    this.handleFiles([file]);
  }

  uploadFilesFromParent(files: File[]): void {
    this.handleFiles(files);
  }

  getUploadedFileIds(): string[] {
    return this.uploadedNewFileIds();
  }

  clearNewFiles(): void {
    this.newFiles.set([]);
    this.uploadedResponses = [];
    this.uploadedFile.set([]);
    this.documentId = null;
    this.emitUploadState();
  }

  removeNewFile(fileId: string): void {
    this.newFiles.update((files) => files.filter((f) => f.id !== fileId));
  }

  deleteFile(): void {
    this.uploadedFile.set([]);
    this.newFiles.set([]);
    this.documentId = null;
    this.uploadErrorMessage = null;
    this.control?.reset();
    this.filesUploaded.emit([]);
    this.fileDeleted.emit({ fileId: this.documentId || '', isNew: true });
    this.emitUploadState();
  }

  onDeleteFile(file: FileItem): void {
    const isNewFile = file.isNew;
    this.fileDeleted.emit({ fileId: file.id, isNew: !!isNewFile });

    if (isNewFile) {
      this.newFiles.update((files) => files.filter((f) => f.id !== file.id));
      if (!this.newFiles().length) {
        this.documentId = null;
        this.control?.reset();
        this.emitUploadState();
      }
    }
  }

  onPreviewFile(file: FileItem): void {
    this.filePreview.emit(file);
  }

  private handleFiles(filesToProcess: File[]): void {
    const validFiles: File[] = [];

    for (const file of filesToProcess) {
      if (file.size > this.maxFileSize()) {
        const error = `File ${file.name} exceeds maximum size of ${this.formatFileSize(this.maxFileSize())}`;
        this.uploadErrorMessage = error;
        this.uploadError.emit({ file, error });
        continue;
      }

      if (!this.isValidFileType(file)) {
        const error = `File type not allowed: ${file.type}`;
        this.uploadErrorMessage = error;
        this.uploadError.emit({ file, error });
        continue;
      }

      validFiles.push(file);
    }

    if (!validFiles.length) return;

    if (this.uploadFn()) {
      this.uploadFileImmediately(validFiles[0]);
      return;
    }

    this.uploadedFile.set(validFiles);
    this.filesUploaded.emit(validFiles);
  }

  private uploadFileImmediately(file: File): void {
    const uploadFn = this.uploadFn();
    if (!uploadFn) return;

    const tempId = this.generateTempId(file);
    const fileItem: FileItem = {
      id: tempId,
      fileName: file.name,
      size: file.size,
      mimeType: file.type,
      progress: 0,
      status: UploadStatus.UPLOADING,
      file,
      isNew: true,
    };

    this.uploadErrorMessage = null;
    this.documentId = null;
    this.newFiles.set([fileItem]);
    this.uploadedFile.set([file]);
    this.emitUploadState();

    const progressInterval = setInterval(() => {
      this.newFiles.update((files) =>
        files.map((f) =>
          f.id === tempId && (f.progress ?? 0) < 90
            ? { ...f, progress: (f.progress ?? 0) + 10 }
            : f
        )
      );
    }, 200);
    this.progressIntervals.set(tempId, progressInterval);

    this._subscription.add(
      uploadFn(file)
        .pipe(
          finalize(() => {
            const interval = this.progressIntervals.get(tempId);
            if (interval) {
              clearInterval(interval);
              this.progressIntervals.delete(tempId);
            }
          })
        )
        .subscribe({
          next: (response) => {
            this.documentId = response.documentId;
            this.newFiles.set([
              {
                ...fileItem,
                id: response.documentId,
                progress: 100,
                status: UploadStatus.SUCCESS,
              },
            ]);
            this.control?.setValue(response.documentId);
            this.filesUploaded.emit(response);
            this.emitUploadState();
          },
          error: (error) => {
            this.uploadErrorMessage = error?.message || 'Upload failed. Please try again.';
            this.newFiles.set([
              {
                ...fileItem,
                progress: 0,
                status: UploadStatus.FAILED,
                error: this.uploadErrorMessage ?? undefined,
              },
            ]);
            this.uploadedFile.set([]);
            this.emitUploadState();
          },
        })
    );
  }

  private emitUploadState(): void {
    const isUploading = this.newFiles().some((f) => f.status === UploadStatus.UPLOADING);
    this.uploadStateChange.emit({
      isUploading,
      documentId: this.documentId,
      hasFile: !!this.documentId || this.uploadedFile().length > 0,
    });
  }

  private updateFileFromAttachment(attachment: Attachment): void {
    this.newFiles.update((currentFiles) => {
      return currentFiles.map((file) => {
        if (file.fileName === attachment.nameFile && file.size === attachment.size) {
          const updatedFile: FileItem = {
            ...file,
            progress: attachment.status?.percentage ?? 0,
            error: attachment.errorMessage,
          };

          if (attachment.uploadStatus === UploadStatus.SUCCESS && attachment.serverResponse) {
            const serverData = attachment.serverResponse as AttachmentFile;
            const responseFile: AttachmentFile = {
              id: attachment.id || serverData?.id || file.id,
              fileName: serverData?.fileName || attachment.nameFile,
              size: serverData?.size || attachment.size,
              mimeType: serverData?.mimeType || file.mimeType,
            };
            this.uploadedResponses.push(responseFile);
            return {
              ...updatedFile,
              id: responseFile.id,
            };
          }

          return updatedFile;
        }
        return file;
      });
    });
  }

  private isValidFileType(file: File): boolean {
    const accepted = this.acceptedTypes();
    if (accepted === '*' || accepted === '*/*') return true;

    const acceptedTypes = accepted.split(',').map((t) => t.trim().toLowerCase());
    const fileType = file.type.toLowerCase();
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

    return acceptedTypes.some((type) => {
      if (type.startsWith('.')) {
        return fileExt === type;
      }
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.replace('/*', '/'));
      }
      return fileType === type;
    });
  }

  private generateTempId(file: File): string {
    return `temp-${file.name}-${file.size}-${Date.now()}`;
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

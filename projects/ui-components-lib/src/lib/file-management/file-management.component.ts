import {
  Component,
  EventEmitter,
  inject,
  input,
  OnDestroy,
  Output,
  signal,
  ViewChild,
  ElementRef,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Subject } from 'rxjs';

import { FileSizePipe } from './pipes';
import { Attachment, AttachmentFile, FileItem, UploadStatus } from './interfaces/file.interface';

@Component({
  selector: 'app-file-management',
  imports: [CommonModule, TranslatePipe, ButtonModule, TooltipModule, FileSizePipe],
templateUrl: './file-management.component.html',
  styleUrl: './file-management.component.scss',
})
export class FileManagementComponent implements OnDestroy {
  // Inputs
  existingFiles = input<AttachmentFile[]>([]);
  acceptedTypes = input<string>('*');
  maxFileSize = input<number>(10485760); //250 MB
  maxConcurrentUploads = input<number>(3);
  showTable = input<boolean>(true);
  showDropZone = input<boolean>(true);
  allowPreview = input<boolean>(true);
  permissonKey = input<string>('');
  allowedActions = input<string[]>([]);
  uploadedFile = signal<any[]>([]);

  // Outputs
  @Output() filesUploaded = new EventEmitter<any>();
  @Output() fileDeleted = new EventEmitter<{ fileId: string; isNew: boolean }>();
  @Output() filePreview = new EventEmitter<FileItem>();
  @Output() fileDownload = new EventEmitter<FileItem>();
  @Output() uploadError = new EventEmitter<{ file: File; error: string }>();
  @Output() newFilesChange = new EventEmitter<FileItem[]>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private destroy$ = new Subject<void>();

  // State - separate new uploads from existing files
  isDragOver = signal(false);
  newFiles = signal<FileItem[]>([]); // Files being uploaded or newly uploaded
  uploadedResponses: AttachmentFile[] = [];

  // Combined files list for the table (existing + new)
  allFiles = computed<FileItem[]>(() => {
    const existing = this.existingFiles().map((f) => ({
      ...f,
      status: undefined, // Don't show status for existing files
      isNew: false,
    }));
    const newOnes = this.newFiles();

    return [...newOnes, ...existing];
  });

  // Get only successfully uploaded new file IDs
  uploadedNewFileIds = computed(() => {
    return this.newFiles()
      .filter((f) => f.status === UploadStatus.SUCCESS && f.id && !f.id.startsWith('temp-'))
      .map((f) => f.id);
  });

  // Formatted accepted file types for display
  formattedAcceptedTypes = computed<string>(() => {
    const accepted = this.acceptedTypes();
    if (accepted === '*' || accepted === '*/*') return '';

    return accepted
      .split(',')
      .map((type) => type.trim().replace('.', '').toUpperCase())
      .join(', ');
  });

  // Table configuration


  constructor() {
    // Emit when new files change
    effect(() => {
      const newFilesList = this.newFiles();
      this.newFilesChange.emit(newFilesList);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Drag & Drop handlers
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

  // Browse button handler
  onBrowseClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
      // Reset input to allow selecting the same file again
      input.value = '';
    }
  }

  // Public method to trigger file selection from parent
  public triggerFileInput(): void {
    this.fileInput?.nativeElement?.click();
  }

  // Public method to append file selection from parent
  public appendFileFromParent(file: File): void {
    this.handleFiles([file]);
  }

  // Public method to upload files programmatically from parent
  public uploadFilesFromParent(files: File[]): void {
    this.handleFiles(files);
  }

  // Public method to get new uploaded file IDs
  public getUploadedFileIds(): string[] {
    return this.uploadedNewFileIds();
  }

  // Public method to clear new files (after save)
  public clearNewFiles(): void {
    this.newFiles.set([]);
    this.uploadedResponses = [];
  }

  // Public method to remove a new file by ID
  public removeNewFile(fileId: string): void {
    this.newFiles.update((files) => files.filter((f) => f.id !== fileId));
  }

  // Check if there are pending/uploading files


  // File handling
  private handleFiles(filesToProcess: File[]): void {
    const validFiles: File[] = [];

    for (const file of filesToProcess) {
      // Validate file size
      if (file.size > this.maxFileSize()) {
        this.uploadError.emit({
          file,
          error: `File ${file.name} exceeds maximum size of ${this.formatFileSize(this.maxFileSize())}`,
        });
        continue;
      }

      // Validate file type
      // if (!this.isValidFileType(file)) {
      //   this.uploadError.emit({
      //     file,
      //     error: `File type not allowed: ${file.type}`,
      //   });
      //   continue;
      // }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      // this.uploadFiles(validFiles);
      this.uploadedFile.set(validFiles)
      this.filesUploaded.emit(validFiles)
      console.log('uploadedFile', this.uploadedFile())
    }
  }
  deleteFile() {
    this.uploadedFile.set([])
    this.filesUploaded.emit([])
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




  private updateFileFromAttachment(attachment: Attachment): void {
    this.newFiles.update((currentFiles) => {
      return currentFiles.map((file) => {
        // Match by file name and size
        if (file.fileName === attachment.nameFile && file.size === attachment.size) {
          const updatedFile: FileItem = {
            ...file,
            progress: attachment.status?.percentage ?? 0,
            error: attachment.errorMessage,
          };

          // If upload succeeded, update with response data from serverResponse
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

  // Actions
  onDeleteFile(file: FileItem): void {
    const isNewFile = file.isNew;
    this.fileDeleted.emit({ fileId: file.id, isNew: !!isNewFile });

    if (isNewFile) {
      // Remove from newFiles list immediately for new uploads
      this.newFiles.update((files) => files.filter((f) => f.id !== file.id));
    }
  }

  onPreviewFile(file: FileItem): void {
    this.filePreview.emit(file);
  }


  private removeFileFromList(fileId: string): void {
    this.newFiles.update((current) => current.filter((f) => f.id !== fileId));
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

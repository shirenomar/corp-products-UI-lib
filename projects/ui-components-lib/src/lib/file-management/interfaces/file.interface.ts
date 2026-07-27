export interface FileUploadResponse {
  documentId: string;
  [key: string]: any;
}

export interface FileUploadState {
  isUploading: boolean;
  documentId: string | null;
  hasFile: boolean;
}

export interface AttachmentFile {
  id: string;
  fileName: string;
  size: number;
  mimeType: string;
  createdDate?: string;
  createdBy?: UserProfileData;
  createdByDepartment?: Department;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: UploadStatus;
  error?: string;
  response?: AttachmentFile;
}
export interface Department {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface FileItem extends AttachmentFile {
  progress?: number;
  status?: UploadStatus;
  error?: string;
  file?: File;
  isNew?: boolean; // Flag to differentiate new uploads from existing files
}

export interface DownloadRequest {
  attachmentIds: string[];
}

export interface FileTypeConfig {
  icon: string;
  iconPathCount: number;
  colorClass?: string;
}

export interface PdfPreviewState {
  visible: boolean;
  blob: Blob | null;
  fileName: string;
}
export interface Attachment {
  id?: string;
  nameFile: string;
  size: number;
  url?: string | ArrayBuffer | null;
  file?: File;
  isCanceled?: boolean;
  uploadStatus?: UploadStatus;
  status?: AttachmentStatusDisplay;
  serverResponse?: unknown;
  errorMessage?: string;
}
export interface AttachmentStatusDisplay {
    icon: string;
    label: string;
    labelClass?: string;
    percentage?: number;
    success?: boolean;
}
export enum UploadStatus {
    PENDING = "pending",
    SUCCESS = "success",
    UPLOADING = "uploading",
    FAILED = "failed"
}
export interface UserProfileData {
    contact: Contact;
    position: Position;
    email: string;
    profileImage: string;
    nameEn: string;
    nameAr: string;
}
export interface Contact {
    mobile: string;
    work: string;
}
export interface Position {
    code: string;
    name: string;
}

export const FileExtentions = [
  'jpeg',
  'pptx',
  'xlsx',
  'xls',
  'doc',
  'docx',
  'jpg',
  'png',
  'pdf',
  'txt',
  'csv',
  'msg',
  'zip',
  'win',
  'xlsb',
  'ppt',
  'rar',
];

/** Comma-separated bare extensions (e.g. "pdf,doc") for validation */
export function fileExtensionsToString(extensions: readonly string[] = FileExtentions): string {
  return extensions.join(',');
}

/** Dot-prefixed extensions for HTML accept attribute (e.g. ".pdf,.doc") */
export function formatFileExtensionsForAccept(extensions: readonly string[] = FileExtentions): string {
  return extensions.map((ext) => (ext.startsWith('.') ? ext : `.${ext}`)).join(',');
}

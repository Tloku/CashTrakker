
export interface FileToUpload {
  id: string,
  file: File;
  uploadDate: string;
}

export interface QueuedFile {
  id: string,
  file: File;
  fileName: string;
  uploadDate: string;
  uploadProgress?: number;
  isBeingUploaded?: boolean;
}

export interface NewFileTableData {
  id: string,
  fileName: string,
  file: File,
  uploadDate: string,
}

export interface FileChunk {
  id: string,
  fileName: string,
  data: Blob,
  uploadDate: string,
  chunkNumber: number,
  totalChunks: number
  isFirstChunk: boolean,
  isLastChunk: boolean
}

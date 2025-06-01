
export interface FileToUpload {
  id: string,
  file: File;
  uploadDate: Date;
}

export interface FileChunk {
  id: string,
  fileName: string,
  data: Blob,
  uploadDate: Date,
  chunkNumber: number,
  totalChunks: number
  isFirstChunk: boolean,
  isLastChunk: boolean
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FileChunk, FileToUpload } from "../../store/models/file-to-upload.model";
import { FileUploaderService } from "../api/file-uploader.service";
import { catchError, EMPTY, Observable, retry, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { FileChunkActions, QueuedFileActions } from "../../store/actions/file-upload.actions";

@Injectable({
  providedIn: 'root'
})
export class ProcessFileUploadsService {
  constructor(
    private readonly _store: Store,
    private readonly _fileUploaderService: FileUploaderService
  ) {}


  upload(chunk: FileChunk): void {
    this._fileUploaderService.uploadChunk(chunk)
      .pipe(
        tap(_ => this._processUploadingChunks(chunk)),
        catchError((err: any) => {
          this._handleChunkUploadError(err, chunk)
          return EMPTY
        })
      )
      .subscribe()
  }

  divideFileInChunks(fileToUpload: FileToUpload): FileChunk[] {
    const file = fileToUpload.file
    const chunks: FileChunk[] = [];
    const chunkSize = 5 * 1024 * 1024; // 5MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    console.log('in division', totalChunks)
    
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      chunks.push({
        id: fileToUpload.id,
        fileName: file.name,
        data: chunk,
        chunkNumber: i + 1,
        totalChunks: totalChunks,
        isFirstChunk: i == 0,
        isLastChunk: i == totalChunks - 1,
        uploadDate: fileToUpload.uploadDate
      });
    }
    return chunks
  }

  removeChunksAfterCompletion(fileChunk: FileChunk): void {
    this._store.dispatch(FileChunkActions.removeChunkAfterCompletion(fileChunk))
  }


  private _processUploadingChunks(chunk: FileChunk): void {
    console.log(`Uploaded chunk: ${chunk.id}-${chunk.chunkNumber}`)
    this._store.dispatch(FileChunkActions.uploadChunckSuccess(chunk))
  }

  private _handleChunkUploadError(err: any, chunk: FileChunk): void {
    console.log("Error occured when uploading chunk: ", err)

    this._store.dispatch(QueuedFileActions.pop())
    this._store.dispatch(FileChunkActions.uploadChunckFailed(err))
  }
}
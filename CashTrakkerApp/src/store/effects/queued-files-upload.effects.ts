import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { filter, map, tap, withLatestFrom } from "rxjs";
import * as FileUploadActions from '../actions/file-upload.actions';
import * as QueuedfilesSelector from "../selectors/queued-files-upload.selector";
import { FileChunk } from "../models/file-to-upload.model";
import { ProcessFileUploadsService } from "../../services/file-uploads/process-file-uploads.service";

@Injectable()
export class QueuedFilesUploadEffects {
  private QueuedFileActions = FileUploadActions.QueuedFileActions;
  private FileChunkActions = FileUploadActions.FileChunkActions;

  private _actions$ = inject(Actions);
  private _store = inject(Store);
  private _processFileService = inject(ProcessFileUploadsService)

  processUploading$ = createEffect(() => 
    this._actions$.pipe(
      ofType(this.QueuedFileActions.processUploading),
      withLatestFrom(this._store.select(QueuedfilesSelector.selectAll)),
      map(([_, files]) => {
        files.forEach(file => 
          this._store.dispatch(this.QueuedFileActions.upload(file))
        ) 

        return this.QueuedFileActions.processUploadingSuccess()
      }))
    )

  upload$ = createEffect(() => 
    this._actions$.pipe(
      ofType(this.QueuedFileActions.upload),
      map(action => this._processFileService.divideFileInChunks(action)),
      tap((fileChunks: FileChunk[]) => this._store.dispatch(this.FileChunkActions.addChunks({chunks: fileChunks}))),
      map((fileChunks: FileChunk[]) => {
        this._store.dispatch(this.FileChunkActions.addChunks({chunks: fileChunks}))
        fileChunks.forEach((chunk: FileChunk) => 
          this._store.dispatch(this.FileChunkActions.uploadChunk(chunk))
        )
      }
      ),
      map(() => this.QueuedFileActions.uploadSuccess())
    )
  )

  pop$ = createEffect(() => 
    this._actions$.pipe(
      ofType(this.QueuedFileActions.popAndGet),
      withLatestFrom(this._store.select(QueuedfilesSelector.selectLastQueuedFile)),
      filter(([_, lastFile]) => !!lastFile),
      map(([_, lastFile]) => this._store.dispatch(FileUploadActions.deleteFileToUpload({id: lastFile?.id!}))),
      map(() => this.QueuedFileActions.pop())
    )
  )
}
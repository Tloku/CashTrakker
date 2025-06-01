import { inject, Injectable, Signal } from "@angular/core";
import * as FileUploadActions from '../actions/file-upload.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ProcessFileUploadsService } from "../../services/file-uploads/process-file-uploads.service";
import { filter, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { FileChunk } from "../models/file-to-upload.model";
import { getChunkByIdAndNumber } from "../selectors/file-chunks.selectors";

@Injectable()
export class ChuncksUploadEffects {
  private FileChunkActions = FileUploadActions.FileChunkActions;

  private _actions$ = inject(Actions);
  private _store = inject(Store);
  private _processFileService = inject(ProcessFileUploadsService)

  uploadChunk$ = createEffect(() => 
    this._actions$.pipe(
      ofType(this.FileChunkActions.uploadChunk),
      map((chunk: FileChunk) => this._processFileService.upload(chunk))
    ),
    { dispatch: false }
  )

  uploadChunkSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(this.FileChunkActions.uploadChunckSuccess),
      filter(fileChunk => !!fileChunk),
      switchMap((fileChunk) => 
        this._store.select(getChunkByIdAndNumber(fileChunk.id, fileChunk.chunkNumber + 1)).pipe(
          map(next => ({ fileChunk, next }))
        )
      ),
      switchMap(({fileChunk, next}) => next
        ? of(this.FileChunkActions.uploadChunk(next))
        : of(this.FileChunkActions.finish(fileChunk)) 
      )
    )
  );

  finish$ = createEffect(() => 
    this._actions$.pipe(
      ofType(this.FileChunkActions.finish),
      map((chunk: FileChunk) => this._processFileService.removeChunksAfterCompletion(chunk))
    ),
    { dispatch: false }
  )
}
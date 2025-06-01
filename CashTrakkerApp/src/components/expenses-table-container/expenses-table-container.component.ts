import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FileToUploadState } from '../../store/reducers/file-upload.reducer';
import { Store } from '@ngrx/store';
import * as FileUploadSelector from '../../store/selectors/file-upload.selectors';
import { Observable, take, tap } from 'rxjs';
import { FileToUpload } from '../../store/models/file-to-upload.model';
import { CommonModule } from '@angular/common';
import { FileUploaderService } from '../../services/api/file-uploader.service';
import { QueuedFileActions } from '../../store/actions/file-upload.actions';
import { v4 } from 'uuid';

@Component({
  selector: 'app-expenses-table-container',
  imports: [
    TableModule,
    CommonModule
  ],
  providers: [
    FileUploaderService
  ],
  templateUrl: './expenses-table-container.component.html',
  styleUrl: './expenses-table-container.component.scss'
})
export class ExpensesTableContainerComponent {

    products: any[] = [
      {id: 1, tit: 'title', some: 'something'},
      {id: 2, tit: 'title', some: 'something'},
    ]

    fileUploads$: Observable<FileToUpload[]>;

    constructor(
      private readonly _store: Store<FileToUploadState>,
      private readonly _fileUploaderService: FileUploaderService
    
    ) {
      this.fileUploads$ = this._store.select(FileUploadSelector.selectAll)
    }

    attachFiles() {
      this.fileUploads$
        .pipe(
          take(1),
          tap((filesToUpload: FileToUpload[]) => {
            this._store.dispatch(QueuedFileActions.queueAll({ filesToUpload }))
          })
        )
        .subscribe()
    }

    popQueuedFile() {
      this._store.dispatch(QueuedFileActions.popAndGet())
    }

    uploadFiles() {
      this._store.dispatch(QueuedFileActions.processUploading())
    }

    // mapFileToUploadToQueuedFiles(fileToUpload: FileToUpload, index: number): QueuedFileChunkToUpload {
    //   return {
    //     id: v4(),
    //     file: fileToUpload,
    //     uploadDate: Date.now(),
    //     chunkNumber: 1,
    //     totalChunks: 2,
    //     isFirstChunk: ,
    //     isLastChunk: boolean
    //   } as QueuedFileChunkToUpload
    // }
}

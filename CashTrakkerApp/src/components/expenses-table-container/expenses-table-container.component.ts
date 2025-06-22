import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {FileToUploadState} from '../../store/reducers/file-upload.reducer';
import {Store} from '@ngrx/store';
import * as FileUploadSelector from '../../store/selectors/file-upload.selectors';
import {Observable, take, tap} from 'rxjs';
import {FileToUpload} from '../../store/models/file-to-upload.model';
import {CommonModule} from '@angular/common';
import {FileUploaderService} from '../../services/api/file-uploader.service';
import {QueuedFileActions} from '../../store/actions/file-upload.actions';
import {CtCommonTableComponent} from '../common/ct-table/ct-common-table.component';
import {KeyValuePair} from '../common/types/keyValuePair';

@Component({
  selector: 'ct-expenses-table-container',
  imports: [
    TableModule,
    CommonModule,
    CtCommonTableComponent
  ],
  providers: [
    FileUploaderService
  ],
  templateUrl: './expenses-table-container.component.html',
  styleUrl: './expenses-table-container.component.scss'
})
export class ExpensesTableContainerComponent implements OnInit {

    filesRowNamesKvp: KeyValuePair[] = [
      { key: 'Identyfikator', value: "id"},
      { key: "Nazwa pliku", value: "fileName"},
      { key: "Data dodania", value: "uploadDate" }
    ]

    tableMinWidth: string = '30rem'

    fileUploads$: Observable<FileToUpload[]> | undefined;

    constructor(
      private readonly _store: Store<FileToUploadState>,
      private readonly _fileUploaderService: FileUploaderService
    ) {}

    ngOnInit(): void {
      this.fileUploads$ = this._store.select(FileUploadSelector.selectAll)
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

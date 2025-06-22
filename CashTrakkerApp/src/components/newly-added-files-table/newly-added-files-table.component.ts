import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {CtCommonTableComponent} from "../common/ct-table/ct-common-table.component";
import {KeyValuePair} from '../common/types/keyValuePair';
import {map, Observable, take, tap} from 'rxjs';
import {FileToUpload, NewFileTableData, QueuedFile} from '../../store/models/file-to-upload.model';
import {Store} from '@ngrx/store';
import {FileToUploadState} from '../../store/reducers/file-upload.reducer';
import {FileUploaderService} from '../../services/api/file-uploader.service';
import * as FileUploadSelector from '../../store/selectors/file-upload.selectors';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {clearFilesToUpload, QueuedFileActions, removeNewFile} from '../../store/actions/file-upload.actions';

@Component({
  selector: 'ct-newly-added-files-table',
  imports: [
    AsyncPipe,
    CtCommonTableComponent,
    NgIf,
    ButtonDirective,
    ButtonLabel
  ],
  templateUrl: './newly-added-files-table.component.html',
  styleUrl: './newly-added-files-table.component.scss',
  standalone: true,
})
export class NewlyAddedFilesTableComponent implements OnInit {

  filesRowNamesKvp: KeyValuePair[] = [
    { key: 'Identyfikator pliku', value: "id"},
    { key: "Nazwa pliku", value: "fileName"},
    { key: "Data dodania", value: "uploadDate" }
  ]

  tableMinWidth: string = '100%'

  newFiles$: Observable<NewFileTableData[]> | undefined;

  constructor(
    private readonly store: Store<FileToUploadState>,
    private readonly _fileUploaderService: FileUploaderService
  ) {}

  ngOnInit(): void {
    this.newFiles$ = this.store.select(FileUploadSelector.selectAll)
      .pipe(
        map((files: FileToUpload[]) =>
          files.map((file: FileToUpload)=> ({
                id: file.id,
                file: file.file,
                fileName: file.file.name,
                uploadDate: file.uploadDate
              } as NewFileTableData
            )
          )
        )
      )
  }

  attachFiles() {
    this.newFiles$?.pipe(
      take(1),
      map((files: NewFileTableData[]) =>
        files.map((file: NewFileTableData) => ({
          id: file.id,
          file: file.file,
          fileName: file.file.name,
          uploadDate: file.uploadDate,
          isBeingUploaded: true,
          uploadProgress: 0
        } as QueuedFile)
      )),
      tap((filesToUpload: QueuedFile[]) => {
        this.store.dispatch(QueuedFileActions.queueAll({ filesToUpload }))
      }),
      tap(_ => this.store.dispatch(clearFilesToUpload()))
      ).subscribe()
  }

  removeNewFileElement(id: string): void {
    this.store.dispatch(removeNewFile({ id }))
  }
}

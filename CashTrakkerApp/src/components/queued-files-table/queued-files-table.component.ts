import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {ButtonDirective, ButtonLabel} from "primeng/button";
import {CtCommonTableComponent} from "../common/ct-table/ct-common-table.component";
import {KeyValuePair} from '../common/types/keyValuePair';
import {Observable} from 'rxjs';
import {QueuedFile} from '../../store/models/file-to-upload.model';
import {Store} from '@ngrx/store';
import {FileToUploadState} from '../../store/reducers/file-upload.reducer';
import {FileUploaderService} from '../../services/api/file-uploader.service';
import * as QueuedFilesSelector from '../../store/selectors/queued-files-upload.selector';
import {QueuedFileActions} from '../../store/actions/file-upload.actions';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'ct-queued-files-table',
  imports: [
    AsyncPipe,
    ButtonDirective,
    ButtonLabel,
    NgIf,
    NgTemplateOutlet,
    NgForOf,
    PrimeTemplate,
    TableModule,
    ProgressBar,
  ],
  templateUrl: './queued-files-table.component.html',
  styleUrl: './queued-files-table.component.scss',
  standalone: true,
})
export class QueuedFilesTableComponent implements OnInit {

  filesRowNamesKvp: KeyValuePair[] = [
    { key: 'Identyfikator pliku', value: "id"},
    { key: "Nazwa pliku", value: "fileName"},
    { key: "Data dodania", value: "uploadDate" }
  ]

  tableMinWidth: string = '100%'

  queuedFiles$: Observable<QueuedFile[]> | undefined;

  constructor(
    private readonly _store: Store<FileToUploadState>,
    private readonly _fileUploaderService: FileUploaderService
  ) {}

  ngOnInit(): void {
    this.queuedFiles$ = this._store.select(QueuedFilesSelector.selectAll)
  }

  uploadFiles(): void {
    this._store.dispatch(QueuedFileActions.processUploading())
  }

  removeQueuedFile(id: string) {
    this._store.dispatch(QueuedFileActions.removeById({id}))
  }
}

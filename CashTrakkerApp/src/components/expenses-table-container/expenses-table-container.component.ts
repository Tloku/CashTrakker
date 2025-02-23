import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FileToUploadState } from '../../store/reducers/file-upload.reducer';
import { Store } from '@ngrx/store';
import * as FileUploadSelector from '../../store/selectors/file-upload.selectors';
import { Observable } from 'rxjs';
import { FileToUpload } from '../../store/models/file-to-upload.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses-table-container',
  imports: [
    TableModule,
    CommonModule
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

    constructor(private _store: Store<FileToUploadState>) {
      this.fileUploads$ = this._store.select(FileUploadSelector.selectAll)
    }



}

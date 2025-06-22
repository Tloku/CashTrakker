import { Component } from '@angular/core';
import { ExpensesTableContainerComponent } from "../expenses-table-container/expenses-table-container.component";
import { FileUploaderService } from '../../services/api/file-uploader.service';
import {NewlyAddedFilesTableComponent} from '../newly-added-files-table/newly-added-files-table.component';
import {QueuedFilesTableComponent} from '../queued-files-table/queued-files-table.component';

@Component({
  selector: 'ct-main-page-container',
  imports: [
    ExpensesTableContainerComponent,
    NewlyAddedFilesTableComponent,
    QueuedFilesTableComponent,
  ],
  templateUrl: './main-page-container.component.html',
  styleUrl: './main-page-container.component.scss',
  providers: [
    FileUploaderService
  ],
  standalone: true,
})
export class MainPageContainerComponent {

}

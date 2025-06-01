import { Component } from '@angular/core';
import { ExpensesTableContainerComponent } from "../expenses-table-container/expenses-table-container.component";
import { FileUploaderService } from '../../services/api/file-uploader.service';
@Component({
  selector: 'app-main-page-container',
  imports: [
    ExpensesTableContainerComponent,
  ],
  templateUrl: './main-page-container.component.html',
  styleUrl: './main-page-container.component.scss',
  providers: [
    FileUploaderService
  ]
})
export class MainPageContainerComponent {

}

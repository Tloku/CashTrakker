import { Component } from '@angular/core';
import { ExpensesTableContainerComponent } from "../expenses-table-container/expenses-table-container.component";

@Component({
  selector: 'app-main-page-container',
  imports: [ExpensesTableContainerComponent],
  templateUrl: './main-page-container.component.html',
  styleUrl: './main-page-container.component.scss'
})
export class MainPageContainerComponent {

}

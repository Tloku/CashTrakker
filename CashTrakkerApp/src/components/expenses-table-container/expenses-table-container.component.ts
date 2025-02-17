import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-expenses-table-container',
  imports: [TableModule],
  templateUrl: './expenses-table-container.component.html',
  styleUrl: './expenses-table-container.component.scss'
})
export class ExpensesTableContainerComponent {

    products: any[] = [
      {id: 1, tit: 'title', some: 'something'},
      {id: 2, tit: 'title', some: 'something'},
    ]
}

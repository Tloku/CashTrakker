import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {NgForOf, NgIf} from '@angular/common';
import {KeyValuePair} from '../types/keyValuePair';
import {ButtonDirective, ButtonIcon} from 'primeng/button';
import {Store} from '@ngrx/store';

@Component({
  selector: 'ct-common-table',
  imports: [
    TableModule,
    NgForOf,
    NgIf,
    ButtonDirective,
    ButtonIcon
  ],
  templateUrl: './ct-common-table.component.html',
  styleUrl: './ct-common-table.component.scss'
})
export class CtCommonTableComponent {
  @Input()
  headerRowNames: KeyValuePair[] | null = null;

  @Input()
  value: any[] | null = null

  @Input()
  minTableWidth: string | undefined

  @Input()
  displayRemoveColumn: boolean = false

  @Output()
  removeElementMethod: EventEmitter<string> = new EventEmitter<string>();
}

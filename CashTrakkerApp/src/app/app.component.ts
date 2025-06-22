import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "../components/nav/nav.component";
import { DragDropDirective } from '../directives/drag-and-drop.directive';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ct-root',
  imports: [
    RouterOutlet,
    NavComponent,
    DragDropDirective
  ],
  providers: [
    DatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CashTrakkerApp';
}

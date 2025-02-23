import { Directive, HostListener } from '@angular/core';
import { FileToUploadState } from '../store/reducers/file-upload.reducer';
import { Store } from '@ngrx/store';
import * as FileUploadActions from '../store/actions/file-upload.actions';
import { FileToUpload } from '../store/models/file-to-upload.model';
import { v4 as uuidv4 } from 'uuid';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {
  
  constructor(private _store: Store<FileToUploadState>) { }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    console.log('dragging')
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    console.log('leaving')
    event.preventDefault();
    event.stopImmediatePropagation();
  }


  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!event.dataTransfer?.files) return;

    let fileToUpload: FileToUpload = {
      id: uuidv4(),
      file: event.dataTransfer.files[0],
      uploadDate: new Date()
    }
    debugger;
    this._store.dispatch(FileUploadActions.addFileToUpload({file: fileToUpload}))
  }
}

import {Directive, HostListener, inject} from '@angular/core';
import { FileToUploadState } from '../store/reducers/file-upload.reducer';
import { Store } from '@ngrx/store';
import * as FileUploadActions from '../store/actions/file-upload.actions';
import { FileToUpload } from '../store/models/file-to-upload.model';
import { v4 as uuidv4 } from 'uuid';
import {DatePipe} from '@angular/common';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {
  private datePipe = inject(DatePipe);

  constructor(
    private readonly store: Store<FileToUploadState>
  ) { }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }


  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!event.dataTransfer?.files) return;

    const filesToUpload = Array.from(event.dataTransfer.files)
      .map((file: File) => {
        return {
          id: uuidv4(),
          file: file,
          uploadDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm')
        } as FileToUpload
      })

    this.store.dispatch(FileUploadActions.addFilesToUpload({files: filesToUpload}))
  }
}

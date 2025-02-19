import { createAction, props } from '@ngrx/store';
import { FileToUpload } from '../models/file-to-upload.model';

export const addFileToUpload = createAction(
  '[File Upload] Add',
  props<{file: FileToUpload}>()
);

export const deleteFileToUpload = createAction('[File Upload] Delete', props<{id: string}>());
export const clearFilesToUpload = createAction('[File Upload] Clear');
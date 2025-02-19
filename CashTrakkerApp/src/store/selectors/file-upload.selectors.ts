import { createFeatureSelector } from "@ngrx/store";
import { fileToUploadAdapter, FileToUploadState } from "../reducers/file-upload.reducer";


export const fileUploadState = createFeatureSelector<FileToUploadState>('fileUploads');

export const { selectAll, selectEntities, selectIds, selectTotal } = 
  fileToUploadAdapter.getSelectors(fileUploadState);
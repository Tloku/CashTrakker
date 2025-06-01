import { createReducer, on } from '@ngrx/store'
import { FileToUpload } from '../models/file-to-upload.model'
import * as FileUploadActions from '../actions/file-upload.actions'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const fileToUploadAdapter: EntityAdapter<FileToUpload> = createEntityAdapter<FileToUpload>()

export interface FileToUploadState extends EntityState<FileToUpload> {}

export const initialState: FileToUploadState = fileToUploadAdapter.getInitialState();

export const fileUploadReducer = createReducer(
  initialState,
  on(
    FileUploadActions.addFileToUpload, 
    (state, { file }) => fileToUploadAdapter.addOne(file, state)
  ),
  on(
    FileUploadActions.addFilesToUpload, 
    (state, { files }) => fileToUploadAdapter.addMany(files, state)
  ),
  on(
    FileUploadActions.deleteFileToUpload,
    (state, { id }) => fileToUploadAdapter.removeOne(id, state)
  ),
  on(
    FileUploadActions.clearFilesToUpload,
    (state) => fileToUploadAdapter.removeAll(state)
  )
)
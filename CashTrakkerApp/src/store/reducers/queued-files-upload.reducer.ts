import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { FileToUpload } from "../models/file-to-upload.model";
import { createReducer, on } from "@ngrx/store";
import * as FileUploadActions from '../actions/file-upload.actions'


export const queuedFilesAdapter: EntityAdapter<FileToUpload> = createEntityAdapter<FileToUpload>()

export interface QueuedFilesState extends EntityState<FileToUpload> {}

export const initialState: QueuedFilesState = queuedFilesAdapter.getInitialState()

export const queuedFilesReducer = createReducer(
  initialState,
  on(
    FileUploadActions.QueuedFileActions.queueAll,
    (state, {filesToUpload}) => queuedFilesAdapter.addMany(filesToUpload, state)
  ),
  on(
    FileUploadActions.QueuedFileActions.queue,
    (state, { queuedFile }) => queuedFilesAdapter.addOne(queuedFile, state)
  ),
  on(
    FileUploadActions.QueuedFileActions.pop,
    (state) => {
      if (state.ids.length === 0) return state;
      const lastId: string = state.ids[state.ids.length - 1].toString();
      return queuedFilesAdapter.removeOne(lastId, state);
    }
  )
)
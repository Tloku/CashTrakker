import { createFeatureSelector, createSelector } from "@ngrx/store";
import { queuedFilesAdapter, QueuedFilesState } from "../reducers/queued-files-upload.reducer";

export const queuedFilesState = createFeatureSelector<QueuedFilesState>('queuedFiles');

export const { selectAll, selectEntities, selectIds, selectTotal } = 
  queuedFilesAdapter.getSelectors(queuedFilesState);

export const selectLastQueuedFile = createSelector(
  queuedFilesState,
  (state) => {
    const lastId = state.ids[state.ids.length - 1];
    return lastId ? state.entities[lastId] : null;
  }
);
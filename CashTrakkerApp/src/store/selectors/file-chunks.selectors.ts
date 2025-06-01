import { createFeatureSelector, createSelector } from "@ngrx/store";
import { fileChunkAdapter, FileChunkState } from "../reducers/file-chunk.reducer";
import { FileChunk } from "../models/file-to-upload.model";

export const fileChunkState = createFeatureSelector<FileChunkState>('fileChunks')

export const { selectAll, selectEntities, selectIds, selectTotal } = 
  fileChunkAdapter.getSelectors(fileChunkState);

export const getChunkByIdAndNumber = (chunkId: string, chunkNumber: number) => createSelector(
  fileChunkState,
  (state) => {
    return Object.values(state.entities)
      .find((chunk: FileChunk | undefined) => chunk && chunk.id == chunkId && chunk.chunkNumber == chunkNumber)
  }
)
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from "@ngrx/entity";
import { FileChunk } from "../models/file-to-upload.model";
import { createReducer, on } from "@ngrx/store";
import { FileChunkActions } from "../actions/file-upload.actions";

export const fileChunkAdapter: EntityAdapter<FileChunk> = createEntityAdapter<FileChunk>()

export interface FileChunkState extends EntityState<FileChunk> {}

export const initialState: FileChunkState = fileChunkAdapter.getInitialState();

export const fileChunkReducer = createReducer(
  initialState,
  on(FileChunkActions.addChunks, 
    (state, {chunks}) => fileChunkAdapter.addMany(chunks, state)
  ),
  on(FileChunkActions.removeChunk,
    (state, {chunk}) => {
      if (state.ids.length === 0) return state;
      const chunkToRemove: FileChunk | undefined = Object.values(state.entities!)
        .filter(chunk => !!chunk)
        .find((chunkFromArr: FileChunk) => chunkFromArr.id == chunk.id && chunkFromArr.chunkNumber == chunk.chunkNumber)
      
        if (!chunkToRemove) {
          return state
        }

      return fileChunkAdapter.removeOne(chunkToRemove.id, state);
    }
  )
)
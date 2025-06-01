import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { FileChunk, FileToUpload } from '../models/file-to-upload.model';

export const addFileToUpload = createAction(
  '[File Upload] Add',
  props<{file: FileToUpload}>()
);

export const addFilesToUpload = createAction(
  '[File Upload] Add many',
  props<{files: FileToUpload[]}>()
);

export const deleteFileToUpload = createAction('[File Upload] Delete', props<{id: string}>());
export const clearFilesToUpload = createAction('[File Upload] Clear');

export const QueuedFileActions = createActionGroup({
  source: "QueuedFile",
  events: {
    'QueueAll': props<{filesToUpload: FileToUpload[]}>(),
    'Queue': props<{queuedFile: FileToUpload}>(),
    'Upload': props<FileToUpload>(),
    'UploadSuccess': emptyProps(),
    'UploadFailure': emptyProps(),
    'ProcessUploading': emptyProps(),
    'ProcessUploadingSuccess': emptyProps(),
    'ProcessUploadingFailure': props<{error: string}>(),
    'Pop': emptyProps(),
    'PopAndGet': emptyProps(),
  }
})

export const FileChunkActions = createActionGroup({
  source: "FileChunk",
  events: {
    'UploadChunk': props<FileChunk>(),
    'AddChunks': props<{chunks: FileChunk[]}>(),
    'RemoveChunk': props<{chunk: FileChunk}>(),
    'Finish': props<FileChunk>(),
    'UploadChunckSuccess': props<FileChunk>(),
    'UploadChunckFailed': props<{error: string}>(),
    'RemoveChunkAfterCompletion': props<FileChunk>()
    }
  }
)
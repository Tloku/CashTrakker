import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { fileUploadReducer } from '../store/reducers/file-upload.reducer';
import { queuedFilesReducer } from '../store/reducers/queued-files-upload.reducer';
import { QueuedFilesUploadEffects } from '../store/effects/queued-files-upload.effects';
import { ChuncksUploadEffects } from '../store/effects/chunks-upload.effects';
import {customPreset} from '../custom-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
        theme: {
          preset: customPreset,
          options: {
            darkModeSelector: '.cashtrakker-dark'
          }
        }
    }),
    provideStore(),
    provideState('fileUploads', fileUploadReducer),
    provideState('queuedFiles', queuedFilesReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([QueuedFilesUploadEffects, ChuncksUploadEffects])
  ]
};

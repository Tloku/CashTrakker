import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { FileChunk } from "../../store/models/file-to-upload.model";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  private readonly URL: string = 'http://localhost:8080/file_upload';

  constructor(
    private readonly _http: HttpClient,
    private readonly _store: Store,
  ) {}

  uploadChunk(fileChunk: FileChunk): Observable<string> {
    const formData = new FormData()
    formData.append("file", fileChunk.data)
    formData.append("chunkNumber", fileChunk.chunkNumber.toString())
    formData.append("totalChunks", fileChunk.totalChunks.toString())
    formData.append("isFirstChunk", ''+fileChunk.isFirstChunk)
    formData.append("isLastChunk", ''+fileChunk.isLastChunk)
    formData.append("fileName", fileChunk.fileName)
    formData.append("id",fileChunk.id)

    return this._http.post<string>(this.URL+"/receipt", formData)
  }
  

}
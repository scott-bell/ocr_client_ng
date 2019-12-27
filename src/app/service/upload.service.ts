import {Observable, Subject, timer, Subscription} from "rxjs";
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {DocumentModel} from "../document/document.model";

@Injectable({providedIn: 'root'})
export class UploadService {
  files: Set<File> = new Set();
  complete = false;
  httpPending = false;
  error = null;
  loading: boolean = false;
  documentModel: DocumentModel = null;
  documents: Set<DocumentModel> = new Set();
  state: string = 'ready';
  url = 'http://localhost:8080/document';

  private myTimerSub: Subscription;

  constructor(private http: HttpClient) {
    const ti = timer(2000,1000);
    this.myTimerSub = ti.subscribe(t => {
      for(let doc of this.documents) {
        this.refreshDoc(doc);
      }
    });
  }

  onFilesAdded(files: { [key: string]: File }) {
    //const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  deleteFile(doc: DocumentModel) {
    const url = 'http://localhost:8080/document/' + doc.id

    const formData: FormData = new FormData();
    const req = new HttpRequest('DELETE', url, formData, {
      reportProgress: true
    });
    doc.deleting = true;
    this.http.request(req).subscribe(event => {
      if (event instanceof HttpResponse) {
        doc.status = "DELETED";
        doc.deleting = false;
        this.documents.delete(doc);
      }},
      error => {
        doc.deleting = false;
        console.error(error);
      }
    )
  }

  uploadFiles() {
    const status: { [key: string]: { progress: Observable<number> } } = {};
    this.error = false;
    this.loading = true;

    this.files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const req = new HttpRequest('POST', this.url, formData, {
        reportProgress: true
      });
      const progress = new Subject<number>();

      this.http.request(req).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            progress.next(percentDone);
          } else if (event instanceof HttpResponse) {
            if (event.body['success']) {
              this.documentModel = new DocumentModel(
                event.body['item'].id,
                event.body['item'].filename,
                'unknown',
                event.body['item'].language,
                event.body['item'].profile,
                event.body['item'].status,
                event.body['item'].text_type,
                event.body['item'].image_source,
                event.body['item'].export_format
              );
              this.complete = true;
              this.documents.add(this.documentModel);
              this.state = 'complete';
            } else {
              this.state = 'failed';
              this.error = "Failed to create task";
            }
            progress.complete();
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
          this.state = 'failed';
          this.error = error.message;
        }
      );

      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    this.files = new Set();
    return status;
  }

  refreshDoc(doc: DocumentModel) {
    if (
      (!this.httpPending) &&
      (
        (doc.status == "PENDING") ||
        (doc.status == "QUEUED")
      ))
    {
      this.http.get(
        'http://localhost:8080/document/' + doc.id)
        .subscribe(responseData => {
            console.log(responseData);
            const item = responseData["item"];
            Object.assign(doc, item);
          }, error => {
            console.error(error);
          }
        )
    }
  }

  sendUpdate(doc: DocumentModel) {
    this.httpPending = true;
    this.http.put(
      'http://localhost:8080/document/' + doc.id,
      doc)
      .subscribe(responseData => {
        this.httpPending = false;
        console.log(responseData);
      }, error => {
        this.httpPending = false;
        console.error(error);
      }
    )
  }

}

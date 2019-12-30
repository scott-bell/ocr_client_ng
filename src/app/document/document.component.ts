import {Component, Injectable, Input, OnInit} from '@angular/core';
import {DocumentModel} from "./document.model";
import {UploadService} from "../service/upload.service";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
@Injectable()
export class DocumentComponent implements OnInit {
  @Input() doc: DocumentModel;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  onDelete() {
    this.uploadService.deleteFile(this.doc);
  }

  onStartOCR() {
    this.doc.status = "PENDING";
    this.doc.ocring = true;
    this.uploadService.sendUpdate(this.doc);
  }

  onDownload() {
    window.open("/document/" + this.doc.id + "/result", "_blank");
  }
}

import { Component, OnInit } from '@angular/core';
import {UploadService} from "../service/upload.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public uploadService: UploadService) { }

  ngOnInit() {
  }
  newDoc() {
    this.uploadService.state="ready";
    this.uploadService.loading=false;
    this.uploadService.complete=false;
    this.uploadService.documentModel=null;
  }

}

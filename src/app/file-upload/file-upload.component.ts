import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {UploadService} from "../service/upload.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  animations: [
    trigger('divState', [
      state('complete', style({
        opacity: 1,
        transform: 'translateY(-500)'
      })),
      state('ready', style({
        opacity: 0.0,
        transform: 'translateY(100)'
      })),
      transition("ready <=> complete", animate(500))
    ])
  ]
})
@Injectable()
export class FileUploadComponent implements OnInit {

  error: string = "something didn't work!";
  @ViewChild('file', {static: false}) file;

  constructor(private uploadService: UploadService,
              private router: Router) {

  }

  ngOnInit() {
  }

  // onSubmit(form: HTMLFormElement) {
  // }

  onSubmit() {

  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.uploadService.onFilesAdded(files);
    this.uploadService.uploadFiles();
  }

  uploadFiles() {
    this.uploadService.uploadFiles();
  }

  navOptions() {
    this.router.navigate(['options']);
  }

  showFileSelector() {
    (this.file.nativeElement as HTMLInputElement).click();
  }

  newDoc() {
    this.uploadService.state="ready";
    this.uploadService.loading=false;
    this.uploadService.complete=false;
    this.uploadService.documentModel=null;
  }

  onHandleError() {
    this.uploadService.complete = false;
  }
}

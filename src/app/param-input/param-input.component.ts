import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UploadService} from "../service/upload.service";

@Component({
  selector: 'app-param-input',
  templateUrl: './param-input.component.html',
  styleUrls: ['./param-input.component.css']
})
export class ParamInputComponent implements OnInit {
  @ViewChild('form', {static: false}) optionsForm: NgForm;

  constructor(public uploadService: UploadService, private router: Router) {

  }

  ngOnInit() {
  }

  // onSubmit(form: NgForm) {
  //
  // }

  onSubmit() {

  }

}

import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-automated-response',
  templateUrl: './automated-response.component.html',
  styleUrls: ['./automated-response.component.scss']
})
export class AutomatedResponseComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goback() {
    this.location.back();
  }
  goto(page) {
    this.router.navigate([page]);
  }
}

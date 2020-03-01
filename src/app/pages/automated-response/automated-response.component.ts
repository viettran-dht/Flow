import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-automated-response',
  templateUrl: './automated-response.component.html',
  styleUrls: ['./automated-response.component.scss']
})
export class AutomatedResponseComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor() { }

  ngOnInit() {
  }

}

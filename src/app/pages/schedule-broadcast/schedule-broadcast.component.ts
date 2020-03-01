import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-schedule-broadcast',
  templateUrl: './schedule-broadcast.component.html',
  styleUrls: ['./schedule-broadcast.component.scss']
})
export class ScheduleBroadcastComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit() {
  }

}

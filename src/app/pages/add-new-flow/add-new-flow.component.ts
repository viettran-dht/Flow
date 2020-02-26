import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { TIMEZONELIST } from 'src/app/constant/userTimezone';

@Component({
  selector: 'app-add-new-flow',
  templateUrl: './add-new-flow.component.html',
  styleUrls: ['./add-new-flow.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    // '(document:click)': 'onClick($event)',
  }

})
export class AddNewFlowComponent implements OnInit {
  @ViewChild('zoneSelect', { static: false }) zoneSelect: ElementRef;

  public addFlowForm: FormGroup;
  public listClient = [
    { Id: 1, Name: 'hiep' },
    { Id: 2, Name: 'nam' },
    { Id: 3, Name: 'dung' }
  ];
  public showSelectBox: any = {
    client: false,
    brand: false,
    campaign: false
  };
  public userTimezone: any = TIMEZONELIST;

  constructor(
    private helperService: HelperService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.addFlowForm = this.fb.group({
      flowName: ['', Validators.required],
      client: ['', Validators.required],
      region: [this.userTimezone[0].value, Validators.required],
      tags: [[], Validators.required],
      brand: ['', Validators.required],
      flowStartDate: ['', Validators.required],
      notes: [''],
      campaign: ['', Validators.required],
      flowEndDate: ['', Validators.required],
    });
  }
  onClick(event: any) {
    // if (!this.zoneSelect.nativeElement.contains(event.target)) {
      // this.showSelectBox = false;
      // console.log(event);
      if (!event.target.id) {
        for (const key in this.showSelectBox) {
          if (this.showSelectBox.hasOwnProperty(key)) {
            this.showSelectBox[key] = false;
          }
        }
      } else {
        for (const key in this.showSelectBox) {
          if (this.showSelectBox.hasOwnProperty(key) && key !== event.target.id) {
            this.showSelectBox[key] = false;
          }
        }
      }
    // }
  }
  onFocus(id) {
    this.showSelectBox[id] = true;
    for (const key in this.showSelectBox) {
      if (this.showSelectBox.hasOwnProperty(key) && key !== id) {
        this.showSelectBox[key] = false;
      }
    }
  }

  onAdd(event, type) {
    // this.addFlowForm.get('client').setValue(event);
    this.listClient.push(event);
  }
  onSelect(event, type) {
    this.addFlowForm.get(type).setValue(event.Name);
  }
  save() {
    this.helperService.markFormGroupTouched(this.addFlowForm);
    console.log(this.addFlowForm.value);
    if (this.addFlowForm.invalid) {
      return;
    }
  }
  onTagsChange(event) {
    console.log(event)
    this.addFlowForm.get('tags').setValue(event);
  }
}

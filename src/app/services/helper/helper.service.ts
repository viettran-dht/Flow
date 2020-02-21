import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public doAlert = new BehaviorSubject<any>(null);
  constructor() { }
  markFormGroupTouched(formGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  alert(type, message) {
    const option = {
      type,
      message
    };
    this.doAlert.next(option);
  }
}

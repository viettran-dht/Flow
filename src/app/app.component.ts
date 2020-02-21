import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastaService, ToastOptions, ToastData } from 'ngx-toasta';
import { HelperService } from './services/helper/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flow';
  private positionSource = new Subject<string>();
  constructor(
    private toastaService: ToastaService,
    private helperService: HelperService
  ) {
    this.helperService.doAlert.subscribe(res => {
      console.log('alert option', res);
      if (!res) {
        return;
      }
      this.addToast(res.type, res.message, res.type);
    });
    this.positionSource.next('top-center');
  }
  addToast(title, msg, option) {
    const toastOptions: ToastOptions = {
      title,
      msg,
      showClose: true,
      showDuration: false,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
      },
      onRemove: (toast: ToastData) => {
      }
    };
    switch (option) {
      case 'default': this.toastaService.default(toastOptions); break;
      case 'info': this.toastaService.info(toastOptions); break;
      case 'success': this.toastaService.success(toastOptions); break;
      case 'wait': this.toastaService.wait(toastOptions); break;
      case 'error': this.toastaService.error(toastOptions); break;
      case 'warning': this.toastaService.warning(toastOptions); break;
    }
  }
}

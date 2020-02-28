import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public httpClient: HttpClient
  ) { }

  getListCountries() {
    return this.httpClient.get('../../assets/data/countries.json');
  }
  createApp(body, idToken) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    const url = `${environment.apiBase}saveApp`;
    // return this.httpClient.post(url, body, { headers });
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, body, { headers }).subscribe((res: any) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
}

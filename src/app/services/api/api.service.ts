import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}

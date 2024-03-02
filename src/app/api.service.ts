import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../auth_config.json';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  ping$() {
    console.log(config.apiUri)
    return this.http.get(`${config.apiUri}/external`);
  }
}

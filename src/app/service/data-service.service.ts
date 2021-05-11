import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getEntityData() {
    return this.http.get('/assets/entityData.json');
  }

  getEntityMetaData() {
    return this.http.get('/assets/entityMeta.json');
  }
}

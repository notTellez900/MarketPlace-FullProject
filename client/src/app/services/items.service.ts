import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  API_URI = 'http://localhost:3000/api';

  itemCreated = new Subject<void>();

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get(`${this.API_URI}/items`);
  }

  getCategorias(){
    return this.http.get(`${this.API_URI}/cats`);
  }

  getItem(id: string){
    return this.http.get(`${this.API_URI}/items/${id}`);
  }

  saveItem(item: Item){
    return this.http.post(`${this.API_URI}/items`, item);
  }

  deleteItem(id: string){
    return this.http.delete(`${this.API_URI}/items/${id}`);
  }

  updateItem(id: string|number, updatedItem: Item){
    return this.http.put(`${this.API_URI}/items/${id}`, updatedItem);
  }
}

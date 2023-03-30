import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Categoria } from '../models/Cat';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get(`${this.API_URI}/cats`);
  }

  getItem(id: string){
    return this.http.get(`${this.API_URI}/cats/${id}`);
  }

  saveItem(categoria: Categoria){
    return this.http.post(`${this.API_URI}/cats`, categoria);
  }

  deleteItem(id: string){
    return this.http.delete(`${this.API_URI}/cats/${id}`);
  }

  updateItem(id: string|number, updatedCategoria: Categoria){
    return this.http.put(`${this.API_URI}/cats/${id}`, updatedCategoria);
  }
}

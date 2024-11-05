import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/produto/listar-admin`, { observe: 'response' });
  }

  getAllProductsSelect() :Observable<HttpResponse<any>>{
    return this.http.get(`${this.apiUrl}/produto/listar-select`, {observe: 'response'});
  }

  getAllProductsMetadados() :Observable<HttpResponse<any>>{
    return this.http.get(`${this.apiUrl}/produto/metadados`, {observe: 'response'});
  }
}

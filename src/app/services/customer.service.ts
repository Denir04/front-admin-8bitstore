import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8090/admin';
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/clientes`, { observe: 'response' });
  }

  getAllCustomersQuery(query: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/clientes?${query}`, {
      observe: 'response',
    });
  }

  getOneCustomer(id: string): Observable<HttpResponse<any>>{
    return this.http.get(`${this.apiUrl}/clientes/visualizar/${id}`, {observe: 'response'});
  }
}

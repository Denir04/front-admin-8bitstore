import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/cliente`, { observe: 'response' });
  }

  getAllCustomersQuery(query: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/cliente?${query}`, {
      observe: 'response',
    });
  }

  getOneCustomer(id: string): Observable<HttpResponse<any>>{
    return this.http.get(`${this.apiUrl}/cliente/visualizar?clienteId=${id}`, {observe: 'response'});
  }


  changeAtivo(id: string): Observable<HttpResponse<any>>{
    return this.http.delete(`${this.apiUrl}/cliente?clienteId=${id}`, {observe: 'response'})
  }
}

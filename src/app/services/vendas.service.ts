import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getVendasByProduto(produtoId: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/vendas/filtrar?produtoId=${produtoId}&dataInicio=2024-10-15&dataFim=2024-10-30`, { observe: 'response' });
  }
}

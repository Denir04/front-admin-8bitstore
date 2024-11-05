import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getVendasByProduto(produtoId: string, dataInicio: string, dataFim: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/vendas/filtrar?produtoId=${produtoId}&dataInicio=${dataInicio}&dataFim=${dataFim}`, { observe: 'response' });
  }

  getVendasByCategoria(categoriaId: string, dataInicio: string, dataFim: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/vendas/filtrar/categoria?categoriaId=${categoriaId}&dataInicio=${dataInicio}&dataFim=${dataFim}`, { observe: 'response' });
  }
}

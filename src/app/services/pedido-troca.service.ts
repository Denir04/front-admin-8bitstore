import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itensDevolver } from '../models/itensDevolvidos';

@Injectable({
  providedIn: 'root'
})
export class PedidoTrocaService {
  private apiUrl = 'http://localhost:8080/troca';
  constructor(private http: HttpClient) { }

  getAllTrocas(): Observable<HttpResponse<any>>{
    return this.http.get(this.apiUrl, {observe: 'response'});
  }

  getTrocaDetail(pedidoId: number):Observable<HttpResponse<any>>{
    return this.http.get(`${this.apiUrl}/detalhes?pedidoId=${pedidoId}`, {observe: 'response'});
  }

  changeStatus(pedidoId: number, codigo: string):Observable<HttpResponse<any>>{
    return this.http.put(`${this.apiUrl}/alterar-status?pedidoId=${pedidoId}&codigo=${codigo}`,null,{observe: 'response'});
  }

  finalizarTroca(pedidoId: number, itensDevolver: itensDevolver){
    return this.http.post(`${this.apiUrl}/finalizar?pedidoId=${pedidoId}`,itensDevolver, {observe: 'response'});
  }
}

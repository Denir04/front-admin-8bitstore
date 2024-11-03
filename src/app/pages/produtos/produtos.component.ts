import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { customPatterns } from 'src/app/core/pattern';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtosList: Produto[] = [];
  loading = true;
  error = false;
  customPatterns = customPatterns;

  constructor(
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.produtoService.getAllProducts().subscribe(
      (data) => {
        this.produtosList = data.body.content;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = true;
      }
    )
  }

  goToViewProduto(id: number){
    this.router.navigate([`produtos/visualizar/${id}`])
  }

  goToHistoricoVendas(){
    this.router.navigate(['produtos/historico-vendas']);
  }

}

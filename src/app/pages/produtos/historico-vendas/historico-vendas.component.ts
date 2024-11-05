import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartData, ChartType } from 'chart.js';
import { ProdutoService } from 'src/app/services/produto.service';
import { VendasService } from 'src/app/services/vendas.service';

@Component({
  selector: 'app-historico-vendas',
  templateUrl: './historico-vendas.component.html',
  styleUrls: ['./historico-vendas.component.css']
})
export class HistoricoVendasComponent implements OnInit {
  isCategoria = false;
  vendasForm: FormGroup = new FormGroup({});
  produtoValues:any = [];
  categoriaValues:any = [];
  loading = true;
  labelBack = [];
  itensSelected: any = [];

  constructor(
    private vendasService: VendasService, 
    private produtoService: ProdutoService,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.vendasForm = this.formBuilder.group({
      item_select: [null],
      data_min: ['2024-10-20'],
      data_max: ['2024-11-03'],
    });
  }

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'None',
        fill: false, // Opcional: adiciona preenchimento abaixo da linha
        borderColor: 'blue', // Cor da linha
        backgroundColor: 'rgba(0, 123, 255, 0.3)', // Cor de fundo (preenchimento)
      },
    ]
  };

  // Configurações de opções do gráfico
  public lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  ngOnInit(): void {
    this.produtoService.getAllProductsSelect().subscribe((data) => {
      this.produtoValues = data.body;
    }, (err) => {
      console.error(err);
    })
    this.produtoService.getAllProductsMetadados().subscribe((data) => {
      this.categoriaValues = data.body.categoriaList;
    }, (err) => {
      console.error(err);
    })
  }

  onSubmit(){
    this.findByItem();
  }

  limpar(){
    this.itensSelected = [];
    this.vendasForm.reset({
      item_select: [null],
      data_min: ['2024-10-20'],
      data_max: ['2024-11-03'],
    });
    this.findByItem();
  }

  handleChangeSelect(){
    const idSelecionado = this.vendasForm.get("item_select")?.value;
    if(!idSelecionado) return;
    if(this.itensSelected.find((item:any) => item.id == idSelecionado)) return;
    let itemSelecionado;
    if(!this.isCategoria){
      itemSelecionado = this.produtoValues.find((produto:any) => produto.id == idSelecionado);
      this.itensSelected = [...this.itensSelected, itemSelecionado];
    }else{
      itemSelecionado = this.categoriaValues.find((categoria:any) => categoria.id == idSelecionado);
      this.itensSelected = [...this.itensSelected, {...itemSelecionado, titulo: itemSelecionado.nome}];
    }
    console.log(this.itensSelected);
   
  }

  removeItem(id: number){
    this.itensSelected = this.itensSelected.filter((produto:any) => produto.id != id);
  }

  changeTypeSearch(){
    this.isCategoria = !this.isCategoria;
    this.limpar();
  }

  async findByItem(){
    const promises = this.itensSelected.map(async (item: any) => {
      try {
        let data;
        if(!this.isCategoria){
          data = await this.vendasService
          .getVendasByProduto(item.id, this.vendasForm.get('data_min')?.value, this.vendasForm.get('data_max')?.value)
          .toPromise();
        }
        else{
          data = await this.vendasService
          .getVendasByCategoria(item.id,this.vendasForm.get('data_min')?.value, this.vendasForm.get('data_max')?.value)
          .toPromise();
        }
        this.labelBack = data?.body.map((venda: any) => venda.data_venda);
        item.vendas = data?.body.map((venda: any) => venda.quantidade);
      } catch (err) {
        console.error(err);
      }
    });

    await Promise.all(promises);

    const colors = [
      { borderColor: 'blue', backgroundColor: 'rgba(54, 162, 235, 0.2)' },
      { borderColor: 'red', backgroundColor: 'rgba(255, 99, 132, 0.2)' },
      { borderColor: 'green', backgroundColor: 'rgba(75, 192, 192, 0.2)' },
      { borderColor: 'orange', backgroundColor: 'rgba(255, 159, 64, 0.2)' },
      { borderColor: 'purple', backgroundColor: 'rgba(153, 102, 255, 0.2)' },
      { borderColor: 'yellow', backgroundColor: 'rgba(255, 205, 86, 0.2)' }
    ];

    const newDatasets = this.itensSelected.map((item:any, index: number) => {
      const color = colors[index % colors.length];
      return {
        data: item.vendas,
        label: item.titulo,
        fill: false,
        borderColor: color.borderColor,
        backgroundColor: color.backgroundColor,
      }
    });

    this.lineChartData = {
      labels: this.labelBack,
      datasets: newDatasets
    };
    this.loading = false;
  }
}

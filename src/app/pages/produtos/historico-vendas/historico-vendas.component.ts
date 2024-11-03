import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartType } from 'chart.js';
import { VendasService } from 'src/app/services/vendas.service';

@Component({
  selector: 'app-historico-vendas',
  templateUrl: './historico-vendas.component.html',
  styleUrls: ['./historico-vendas.component.css']
})
export class HistoricoVendasComponent implements OnInit {
  loading = true;
  labelBack = [];
  dataBackFirst = [];

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
  
  constructor(
    private vendasService: VendasService, 
    private router: Router
  ){}

  ngOnInit(): void {
    this.vendasService.getVendasByProduto("1").subscribe((data) => {
      this.labelBack = data.body.map((venda:any) => venda.data_venda);
      this.dataBackFirst = data.body.map((venda: any) => venda.quantidade);
      this.vendasService.getVendasByProduto("2").subscribe((dataSecond) => {
        this.lineChartData = {
          labels: this.labelBack,
          datasets: [
            {
              data: this.dataBackFirst,
              label: 'The Legend of Zelda: Ocarina of Time',
              fill: false, // Opcional: adiciona preenchimento abaixo da linha
              borderColor: 'blue', // Cor da linha
              backgroundColor: 'rgba(0, 123, 255, 0.3)', // Cor de fundo (preenchimento)
            },
            {
              data: dataSecond.body.map((venda: any) => venda.quantidade),
              label: 'Animal Crossing: New Leaf',
              fill: false, // Opcional: adiciona preenchimento abaixo da linha
              borderColor: 'red', // Cor da linha
              backgroundColor: 'pink', // Cor de fundo (preenchimento)
            },
          ]
        }
        this.loading = false;
      }, (err) => {
        console.error(err);
      })
    }, (err) => {
      console.error(err);
      this.loading = false;
    })
  }
}

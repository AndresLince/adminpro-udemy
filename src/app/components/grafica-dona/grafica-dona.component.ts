import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: [
  ]
})
export class GraficaDonaComponent implements OnInit {

  @Input() doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  /*public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];*/
  @Input() doughnutChartData:number[]=[];
  @Input() doughnutChartType: ChartType;
  @Input() leyenda: String = '';

  constructor() { }

  ngOnInit(): void {
  }

}

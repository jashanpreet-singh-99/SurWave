import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { QuestionResponse } from '../../models/question-response';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ColorConfig } from '../../color-config';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() data: QuestionResponse[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Output() selectedOption = new EventEmitter<number>();
  constructor() { }

  pieChartOptions= {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: ColorConfig.bgColor
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.data.map((_d, i) => "Option: " + (i + 1)),
    datasets: [
      {
        data: this.data.map(d => d.optionCount!),
        backgroundColor: ColorConfig.chartColors,
        hoverBackgroundColor: ColorConfig.chartColors,
        hoverBorderColor: ColorConfig.chartColors,
        hoverBorderWidth: 8,
        //data: [1,0,0,0]
      },
    ]};


  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log("New: " + this.data.map(d => d.optionCount!));
    this.pieChartData.labels = this.data.map((_d, i) => "Option: " + (i + 1));
    this.pieChartData.datasets[0].data = this.data.map(d => d.optionCount!);
    this.chart?.update();
  }

  public chartHovered({active}: { event: ChartEvent; active: object[]; }): void {
    if (active.length > 0) {
      const chartElement = active[0] as any;
      const dataIndex = chartElement.index;
      this.selectedOption.emit(dataIndex);
    }
  }

  public chartClicked(event: any): void {
    console.log(event);
    const dataIndex = event.active[0].index;
    const label = this.data[dataIndex].optionText;
    const value = this.data[dataIndex].optionCount;
    this.selectedOption.emit(dataIndex);
    console.log('Pie Clicked : ' + dataIndex + ' - ' + label + ' : ' + value);
  }

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { QuestionResponse } from '../../models/question-response';
import { BaseChartDirective } from 'ng2-charts';
import { ColorConfig } from '../../color-config';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit, OnChanges {

  @Input() data: QuestionResponse[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Output() selectedOption = new EventEmitter<number>();

  constructor() { }

  doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      mode: 'index',
      intersect: true
    },
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
  }
  doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: this.data.map((_d, i) => "Option: " + (i + 1)),
    datasets: [
      {
        data: this.data.map(d => d.optionCount!),
        backgroundColor: ColorConfig.chartColors,
        hoverBackgroundColor: ColorConfig.chartColors,
        hoverBorderColor: ColorConfig.chartColors,
        hoverBorderWidth: 8,
      },
    ]};

  ngOnInit(): void {
  }

  ngOnChanges(_changes: SimpleChanges): void {
    console.log("New: " + this.data.map(d => d.optionCount!));
    this.doughnutChartData.labels = this.data.map((_d, i) => "Option: " + (i + 1));
    this.doughnutChartData.datasets[0].data = this.data.map(d => d.optionCount!);

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
    console.log('Clicked : ' + dataIndex + ' - ' + label + ' : ' + value);
  }

}

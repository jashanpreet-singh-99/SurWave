import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { QuestionResponse } from '../../models/question-response';
import { ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { ColorConfig } from '../../color-config';


@Component({
  selector: 'app-bar-chart-component',
  templateUrl: './bar-chart-component.component.html',
  styleUrls: ['./bar-chart-component.component.css']
})
export class BarChartComponentComponent implements OnInit, OnChanges {

  @Input() data: QuestionResponse[] = [];
  @Output() selectedOption = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {}


  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
        borderColor: ColorConfig.bgColor
      }
    },
    scales: {
      x: {
        display: true,
        ticks: {
          display: true
        },
        grid: {
          display: false,
        }
      },
      y: {
        display: true,
        ticks: {
          maxTicksLimit: 8
        },
        grid: {
          display: true,
        }
      }
    }
  };
  barChartLabels = this.data.map((response:QuestionResponse) => response.optionText);
  barChartType: ChartType  = 'bar';
  barChartLegend = false;
  barChartData = [
    { data: this.data.map((response:QuestionResponse) => response.optionCount),
      // data: [4, 6, 1, 9],
      labels: this.data.map((_d, i) => "Option: " + (i + 1)),
      backgroundColor: ColorConfig.chartColors,
      hoverBackgroundColor: ColorConfig.chartColors,
      hoverBorderColor: ColorConfig.chartColors,
      hoverBorderWidth: 2,
      borderRadius: 24,
    }
  ];

  ngOnChanges() {
    this.barChartLabels = this.data.map((_d, i) => "Option: " + (i + 1));
    this.barChartData[0].data = this.data.map(d => d.optionCount);
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
    console.log('Bar Clicked : ' + dataIndex + ' - ' + label + ' : ' + value);
  }

}

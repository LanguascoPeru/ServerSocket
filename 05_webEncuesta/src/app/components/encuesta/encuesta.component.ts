import { Component, OnInit,OnDestroy, ViewChild  } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
 

import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit, OnDestroy {

  newEncuesta$: Subscription;

  public lineChartData: ChartDataSets[] = [
    { data: [2, 5, 8, 9,10], label: 'Encuentas' },
  ];
  public lineChartLabels: Label[] = ['pregunta 1','pregunta 2','pregunta 3','pregunta 4','pregunta 5'];
  
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
 
 
 

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private http: HttpClient, private websocketService : WebsocketService) { }

  ngOnInit() {
      this.getEncuestas();
      this.getEncuestasSocket();
  }

  getEncuestas(){
    this.http.get('http://localhost:5000/encuesta').subscribe((data:any)=>{
      this.lineChartData =data;
    })
  }

  getEncuestasSocket(){
    this.newEncuesta$ =  this.websocketService.escucharEventos('new-encuestas').subscribe( (resp:any) =>{
      this.lineChartData = resp;
    })
  }
  
  ngOnDestroy(){
    this.newEncuesta$.unsubscribe();
  }

}

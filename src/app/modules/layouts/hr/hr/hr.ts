import { Component } from '@angular/core';
import { FlowbiteService } from '../../../../core/services/Flowbite.Service';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-hr',
  imports: [],
  templateUrl: './hr.html',
  styleUrl: './hr.scss',
})
export class Hr implements OnInit {
constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  // todo   After ViewInit   Highcharts chart load
  ngAfterViewInit(): void {
    Highcharts.chart('hrChart', {
  chart: {
    type: 'pie',
    backgroundColor: '', // <-- نفس لون bg-gray-900 في Tailwind
    plotShadow: false,
    plotBorderWidth: 0,
    borderWidth: 0
    
  },
  title: {
    text: 'HR Analytics',
    style: { color: '#dda' } // خلي العنوان أبيض عشان يبان على الخلفية
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        style: { color: '#adc' } // خلي النسب ظاهرة على الخلفية الداكنة
      }
    }
  },
  series: [{
    name: 'Hires',
    type: 'pie',
    data: [
      ['Jan', 10],
      ['Feb', 14],
      ['Mar', 8],
      ['Apr', 20],
      ['May', 16]
    ]
  }]
});
  }
}

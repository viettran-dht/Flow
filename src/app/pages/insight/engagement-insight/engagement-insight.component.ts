import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { SingleDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-engagement-insight',
  templateUrl: './engagement-insight.component.html',
  styleUrls: ['./engagement-insight.component.scss']
})
export class EngagementInsightComponent implements OnInit {
  public data: any[];
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public trackingData: any;
  public appId: any = '-Lu8MwTfZTWO9ECYgPe4';
  public countIp = 0;
  public trackingApp: any;
  public appDetail: any = {};
  public donutColors = [
    {
      backgroundColor: [
        'rgba(23, 32, 42, 1)',
        'rgba(209, 242, 235, 1)',
        'rgba(247, 220, 111, 1)',
        'rgba(202, 111, 30, 1)',
        'rgba(208, 211, 212, 1)',
        'rgba(91, 44, 111, 1)',
        'rgba(133, 193, 233 , 1)',
        'rgba(146, 43, 33, 1)',
        'rgba(236, 240, 241, 1)',
      ]
    }
  ];
  public doughnutChartLegend = true;
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      fullWidth: false,
      labels: {
        boxWidth: 5,
        fontSize: 5,
        usePointStyle: true,
        padding: 5
      }
    }
  };
  public pieChartPlugins = true;
  constructor(
    private router: Router,
    private location: Location,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
  ) {
    this.getTrackingData(this.appId);
    this.getTrackingApp(this.appId);
    this.getAppDetailById(this.appId);
  }

  ngOnInit() {

  }

  initData() {
    this.initPieChart('os');
    this.initPieChart('platform');
    this.initPieChart('platformType');
  }

  initPieChart(type) {
    if (this.trackingApp[type]) {
      for (const key in this.trackingApp[type]) {
        if (key) {
          this.doughnutChartData.push(this.trackingApp[type][key]);
          this.doughnutChartLabels.push(key);
        }
      }

    }
  }
  goto(page) {
    this.router.navigate([page]);
  }

  backClicked() {
    this.location.back();
  }
  getTrackingApp(appId) {
    const body = {
      appId
    };
    this.apiService.getTrackingApp(body).subscribe((res: any) => {

      this.trackingApp = res.result;
      console.log(this.trackingApp);
      // tslint:disable-next-line:forin
      for (const ip in this.trackingApp.ip) {
        this.countIp += this.trackingApp.ip[ip];
      }
      this.initData();
    });
  }

  getTrackingData(appId) {
    const body = {
      appId
    };
    this.apiService.getTrackingData(body).subscribe((res: any) => {
      this.trackingData = res.result;
      // tslint:disable-next-line:forin
      // this.initBarChart();
    });
  }
  async  getAppDetailById(appId) {
    try {
      const ref: any = await this.firebaseService.getRefById('apps', appId);
      this.appDetail = ref;
    } catch (error) {
    }
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {CommercesService} from '../services/commerces.service';
import {Commerce} from '../models/commerce';
import {Graph} from '../models/graph';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent
} from 'ng-apexcharts';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};
export type ChartOptions1 = {
  series1: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public listCommerces: Commerce[];
  public commerces: Commerce;
  public listWidgets: Commerce[] = [];
  public listGraphs: Graph[];
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions1>;
  public mapbox = (mapboxgl as typeof mapboxgl);
  public map: mapboxgl.Map;
  public style = `mapbox://styles/mapbox/streets-v11`;
  public lat = 4.742043976363009;
  public lng = -74.08699035644531;
  public zoom = 9;
  public listLayers: any;
  public headers: string[];
  public columns: string[];
  public data: any[];

  constructor(
    private commercesService: CommercesService
  ) {
    this.chartOptions = {
      series: [67],
      chart: {
        height: 150,
        type: 'radialBar',
        offsetY: 5
      },
      plotOptions: {
        radialBar: {
          startAngle: -150,
          endAngle: 150,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: 'rgb(252, 132, 21)',
              offsetY: 76
            },
            value: {
              offsetY: 40,
              fontSize: '16px',
              color: 'rgb(252, 132, 21)',
              formatter(val) {
                return val + '%';
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ['Goals']
    };
    this.chartOptions1 = {};
    this.mapbox.accessToken = environment.mapBoxToken;
    this.headers = ['name', 'nit', 'address', 'phone', 'owner', 'schedule'];

  }

  ngOnInit(): void {
    this.getCommerces();
    this.buildMap();
    this.getLayers();
    this.getGraphs();

  }

  getCommerces(): void {
    this.commercesService.getCommerces().subscribe(
      response => {
        if (response !== undefined) {
          this.listCommerces = response;
          for (let i = 0; i < 4; i++) {
            this.listWidgets.push(this.listCommerces[i]);
          }
        } else {
          console.log(response);
          alert('No se encontarron datos para esta Consulta');
        }
      },
      error => {
        alert('Error al ajecutar la Consulta');
        console.log(error);
      }
    );
  }

  getLayers(): void {
    this.commercesService.getLayer().subscribe(
      response => {
        if (response !== undefined) {
          this.listLayers = response;
        } else {
          alert('No se encontarron datos para esta Consulta');
          console.log(response);
        }
      },
      error => {
        alert('Error al ajecutar la Consulta');
        console.log(error);
      }
    );
  }

  buildMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.on('load', () => {
      this.map.addSource('points', {
        type: 'geojson',
        data: this.listLayers
      });
      this.map.addLayer({
        id: 'points',
        type: 'circle',
        source: 'points',
        layout: {

          visibility: 'visible'
        },
        paint: {
          'circle-radius': 8,
          'circle-color': 'rgba(55,148,179,1)'
        },

      });
      this.map.on('click', 'points', (e) => {
        const object: any = e.features[0].geometry;
        const coordinates = object.coordinates.slice();
        const description = '<p>' + e.features[0].properties.name + '</p>' +
        '<p>' + e.features[0].properties.address + '</p>' +
        '<p>' + e.features[0].properties.schedule + '</p>';
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.map);
      });
      this.map.on('mouseenter', 'points', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'points', () => {
        this.map.getCanvas().style.cursor = '';
      });
    });


  }

  buildGraph(): void {
    const data = [];
    const categories = [];
    this.listGraphs.forEach(gp => {
      data.push(new Intl.NumberFormat('es-CO').format(Number(gp.sales)));
      categories.push(gp.name);
    });
    this.chartOptions1 = {
      series1: [
        {
          name: 'Sales USD',
          data
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      title: {
        text: 'Sales'
      },
      xaxis: {
        categories
      }
    };
  }

  getGraphs(): void {
    this.commercesService.getGraph().subscribe(
      response => {
        if (response !== undefined) {
          this.listGraphs = response;
          if (this.listGraphs.length > 0) {
            this.buildGraph();
          }

        } else {
          alert('No se encontarron datos para esta Consulta');
          console.log(response);
        }
      },
      error => {
        alert('Error al ajecutar la Consulta');
        console.log(error);
      }
    );
  }
}

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view.js';
import { getDurationForMs} from '../helpers/date';
import { createPriceStats,createTypeStats,createTimeStats } from '../helpers/stattistic';
import { RADIX, ChartName,  ChartParameters, BAR_HEIGHT, BAR_RATIO} from '../constant';

const createCanvasTemplate = (canvasName) => (
  `<div class="statistics__item ">
    <canvas class="statistics__chart statistics__chart--${canvasName}" id="${canvasName}" width="900"></canvas>
  </div>`
);

const createStatsTemplate = () => (
  `<section class="statistics">
     <h2 class="visually-hidden">Trip statistics</h2>
     ${Object.values(ChartName).map((name) => createCanvasTemplate(name)).join('')}
  </section>`
);


const renderChart = (points, someCtx, title, label, time = false) => {
  someCtx.height = BAR_HEIGHT * BAR_RATIO;

  return new Chart(someCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: [...Object.values(points)].map((type) => Object.keys(type).toString().toUpperCase()),
      datasets: [{
        data: [...Object.values(points)].map((type) => parseInt(Object.values(type), RADIX)),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => time ?` ${getDurationForMs(val)}${label}` : ` ${(val)}${label}`,
        },
      },
      title: {
        display: true,
        text: title,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export default class Statistic extends SmartView {
  constructor(point) {
    super();

    this._data = point;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this.#setCharts();
  }

  get template() {
    return createStatsTemplate();
  }

  removeElement = () => {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  #setCharts = () => {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.element.querySelector('.statistics__chart--money');
    const typeCtx = this.element.querySelector('.statistics__chart--type');
    const timeCtx = this.element.querySelector('.statistics__chart--time');

    const money = createPriceStats(this._data);
    const type = createTypeStats(this._data);
    const time = createTimeStats(this._data);

    this._moneyChart = renderChart(money, moneyCtx, ChartParameters[ChartName.MONEY].TITLE, ChartParameters[ChartName.MONEY].LABEL);
    this._typeChart = renderChart(type, typeCtx, ChartParameters[ChartName.TYPE].TITLE, ChartParameters[ChartName.TYPE].LABEL);
    this._timeChart = renderChart(time, timeCtx, ChartParameters[ChartName.TIME].TITLE, ChartParameters[ChartName.TIME].LABEL, true);
  }
}

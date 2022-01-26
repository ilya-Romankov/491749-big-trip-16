import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view.js';
import {createPriceStats,createTypeStats,createTimeStats} from '../helpers/stattistic';
import {getDurationForMs} from '../helpers/date';

const BAR_HEIGHT = 70;

const renderChart = (points, someCtx, title, label, time = false) => {
  someCtx.height = BAR_HEIGHT * 5;

  const someChart = new Chart(someCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: [...points.keys()].map((type) => type.toUpperCase()),
      datasets: [{
        data: [...points.values()],
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
  return someChart;
};

const createStatsTemplate = () => (
  `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>
  <div class="statistics__item ">
    <canvas class="statistics__chart statistics__chart--money" id="money" width="900"></canvas>
  </div>
  <div class="statistics__item">
    <canvas class="statistics__chart statistics__chart--type" id= "type" width="900"></canvas>
  </div>
  <div class="statistics__item">
    <canvas class="statistics__chart statistics__chart--time" id= "time" width="900"></canvas>
  </div>
</section>`);

export default class StatsView extends SmartView {
  constructor(point) {
    super();

    this._data = point;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this.#setCharts();
  }

  removeElement = () => {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  get template() {
    return createStatsTemplate();
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

    const money = new Map(createPriceStats(this._data));
    const type = new Map(createTypeStats(this._data));
    const time = new Map(createTimeStats(this._data));

    this._moneyChart = renderChart(money, moneyCtx, 'MONEY', ' €');
    this._typeChart = renderChart(type, typeCtx, 'TYPE', 'x');
    this._timeChart = renderChart(time, timeCtx, 'TIME', '', true);
  }
}

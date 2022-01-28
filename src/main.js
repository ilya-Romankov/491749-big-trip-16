import ApiService from './api-service.js';
import Navigation from './view/navigation';
import Path from './view/path';
import StatisticsView from './view/statistic';
import AddButton from './view/add-buttont';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointModel from './model/point-model';
import FilterModel from './model/filter-model';
import { renderElement } from './helpers/render';
import { remove } from './helpers/render';
import { MenuItem, AUTHORIZATION, END_POINT } from './constant';
import { RenderPosition} from './constant';

const pointModel = new PointModel(new ApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const body = document.querySelector('.page-body');

const siteNavigationElement = body.querySelector('.trip-controls__navigation');
const navigation = new Navigation();

renderElement(siteNavigationElement, navigation);

const siteFiltersElement = body.querySelector('.trip-controls__filters');
const siteBoard = body.querySelector('.trip-events');

const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointModel);
const boardPresenter = new BoardPresenter(siteBoard, pointModel, filterModel);

// const path = new Path(pointModel.point);
// const sitePathElement = document.querySelector('.trip-main');
// renderElement(sitePathElement,path, RenderPosition.AFTER_BEGIN);

const btnAdd = new AddButton();
const btnAddContainer = document.querySelector('.trip-main');
renderElement(btnAddContainer, btnAdd);

let statisticsComponent = null;


const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      remove(statisticsComponent);
      filterPresenter.destroy();
      filterPresenter.init();
      boardPresenter.destroy();
      boardPresenter.init();
      boardPresenter.createPoint();
      break;
    case MenuItem.POINT:
      filterPresenter.init();
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      filterPresenter.destroy();
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(pointModel.point);
      renderElement(siteBoard, statisticsComponent, RenderPosition.BEFORE_END);
      break;
  }
};

navigation.setMenuClickHandler(handleSiteMenuClick);
btnAdd.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
boardPresenter.init();
pointModel.init().finally(() => {
  navigation.setMenuClickHandler(handleSiteMenuClick);
  btnAdd.setMenuClickHandler(handleSiteMenuClick);
});



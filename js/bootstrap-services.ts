import {serviceLocator} from './utils/ServiceLocator.ts';
import {GameModel} from './models/GameModel.ts';
import {ConfigModel} from './models/ConfigModel.ts';
import {ConfigService} from './services/ConfigService.ts';
import {GamePlayService} from './services/GamePlayService.ts';
import {GameFlowService} from './services/GameFlowService.ts';
import {TileInteractionService} from './services/TileInteractionService.ts';
import {TilePlayService} from './services/TilePlayService.ts';
import {ElementDistributionService} from './services/ElementDistributionService.ts';

export const Services = {
    configService: Symbol('ConfigService'),
    gamePlayService: Symbol('GamePlayService'),
    gameFlowService: Symbol('GameFlowService'),
    tileInteractionService: Symbol('TileInteractionService'),
    tilePlayService: Symbol('TilePlayService'),
    elementDistributionService: Symbol('ElementDistributionService'),
    configModel: Symbol('ConfigModel'),
    gameModel: Symbol('GameModel'),
};

const gameModel = new GameModel();
const configModel = new ConfigModel();
const configService = new ConfigService(configModel);
const elementDistributionService = new ElementDistributionService();
const gamePlayService = new GamePlayService(elementDistributionService, gameModel);
const gameFlowService = new GameFlowService(gamePlayService);
const tileInteractionService = new TileInteractionService(gamePlayService);

const tilePlayService = new TilePlayService(gamePlayService, tileInteractionService);

export function registerServices(): void {
    serviceLocator.registerSingleton(Services.configModel, configModel);
    serviceLocator.registerSingleton(Services.gameModel, gameModel);
    serviceLocator.registerSingleton(Services.configService, configService);
    serviceLocator.registerSingleton(Services.gamePlayService, gamePlayService);
    serviceLocator.registerSingleton(Services.gameFlowService, gameFlowService);
    serviceLocator.registerSingleton(Services.tileInteractionService, tileInteractionService);
    serviceLocator.registerSingleton(Services.tilePlayService, tilePlayService);
    serviceLocator.registerSingleton(Services.elementDistributionService, elementDistributionService);
}

export {
    configService,
    gamePlayService,
    gameFlowService,
    tileInteractionService,
    tilePlayService,
    elementDistributionService,
};

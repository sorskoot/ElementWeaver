import {serviceLocator} from './utils/ServiceLocator.ts';
import {GameModel} from './models/GameModel.ts';
import {ConfigModel} from './models/ConfigModel.ts';
import {ConfigService} from './services/ConfigService.ts';
import {GamePlayService} from './services/GamePlayService.ts';
import {GameFlowService} from './services/GameFlowService.ts';
import {TileInteractionService} from './services/TileInteractionService.ts';

export const Services = {
    configService: Symbol('ConfigService'),
    gamePlayService: Symbol('GamePlayService'),
    gameFlowService: Symbol('GameFlowService'),
    tileInteractionService: Symbol('TileInteractionService'),
    configModel: Symbol('ConfigModel'),
    gameModel: Symbol('GameModel'),
};

const gameModel = new GameModel();
const configModel = new ConfigModel();
const configService = new ConfigService(configModel);
const gamePlayService = new GamePlayService(gameModel);
const gameFlowService = new GameFlowService(gamePlayService);
const tileInteractionService = new TileInteractionService(gamePlayService);

export function registerServices(): void {
    serviceLocator.registerSingleton(Services.configModel, configModel);
    serviceLocator.registerSingleton(Services.gameModel, gameModel);
    serviceLocator.registerSingleton(Services.configService, configService);
    serviceLocator.registerSingleton(Services.gamePlayService, gamePlayService);
    serviceLocator.registerSingleton(Services.gameFlowService, gameFlowService);
    serviceLocator.registerSingleton(Services.tileInteractionService, tileInteractionService);
}

export {configService, gamePlayService, gameFlowService, tileInteractionService};

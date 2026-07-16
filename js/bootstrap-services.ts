import {serviceLocator} from './utils/ServiceLocator.ts';
import {ConfigModel} from './models/ConfigModel.ts';
import {ConfigService} from './services/ConfigService.ts';
import {GamePlayService} from './services/GamePlayService.ts';
import {GameFlowService} from './services/GameFlowService.ts';

export const Services = {
    configService: Symbol('ConfigService'),
    gamePlayService: Symbol('GamePlayService'),
    gameFlowService: Symbol('GameFlowService'),
    configModel: Symbol('ConfigModel'),
};

const configModel = new ConfigModel();
const configService = new ConfigService(configModel);
const gamePlayService = new GamePlayService();
const gameFlowService = new GameFlowService();

export function registerServices(): void {
    serviceLocator.registerSingleton(Services.configModel, configModel);
    serviceLocator.registerSingleton(Services.configService, configService);
    serviceLocator.registerSingleton(Services.gamePlayService, gamePlayService);
    serviceLocator.registerSingleton(Services.gameFlowService, gameFlowService);
}

export {configService, gamePlayService, gameFlowService};

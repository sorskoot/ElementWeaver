import {serviceLocator} from './utils/ServiceLocator.ts';
import {ConfigModel} from './models/ConfigModel.ts';
import {ConfigService} from './services/ConfigService.ts';

export const Services = {
    configService: Symbol('ConfigService'),

    configModel: Symbol('ConfigModel'),
};

const configModel = new ConfigModel();
const configService = new ConfigService(configModel);

export function registerServices(): void {
    serviceLocator.registerSingleton(Services.configModel, configModel);
    serviceLocator.registerSingleton(Services.configService, configService);
}

export {configService};

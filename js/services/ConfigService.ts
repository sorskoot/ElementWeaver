import {IConfigModel} from '../models/ConfigModel.ts';

export interface IConfigService {}
export class ConfigService implements IConfigService {
    constructor(private configModel: IConfigModel) {}
}

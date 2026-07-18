import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

export class InputHelper extends Component {
    static TypeName = 'input-helper';

    @property.object({required: true})
    leftControllerObject!: Object3D;

    @property.object({required: true})
    rightControllerObject!: Object3D;

    start() {}
}

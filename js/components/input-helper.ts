import {Component, InputComponent, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {serviceLocator} from '../utils/ServiceLocator.ts';
import {IGamePlayService} from '../services/GamePlayService.ts';
import {Services} from '../bootstrap-services.ts';
import {vec3} from 'gl-matrix';

export class InputHelper extends Component {
    static TypeName = 'input-helper';

    //TODO: Implement a way to switch between left and right controller for rotating the tile preview.

    private get gamePlayService() {
        return serviceLocator.get<IGamePlayService>(Services.gamePlayService);
    }

    @property.object({required: true})
    leftControllerObject!: Object3D;

    @property.object({required: true})
    rightControllerObject!: Object3D;

    //declare private leftInput: InputComponent;
    declare private rightInput: InputComponent;

    @property.float(0.1)
    stickDeadzoneThreshold = 0.1;

    @property.float(0.8)
    stickTriggerThreshold = 0.8;

    @property.float(1)
    mouseTriggerThreshold = 1;

    private rotation: vec3 = vec3.create();
    private canRotateFromStick = true;

    start() {
        //this.leftInput = this.leftControllerObject.getComponent(InputComponent)!;
        this.rightInput = this.rightControllerObject.getComponent(InputComponent)!;
    }

    update(dt: number) {
        vec3.zero(this.rotation);

        const axesRight = this.rightInput.xrInputSource?.gamepad?.axes;
        if (
            axesRight &&
            (Math.abs(axesRight[2]) > this.stickDeadzoneThreshold ||
                Math.abs(axesRight[3]) > this.stickDeadzoneThreshold)
        ) {
            this.rotation[0] = axesRight[2];
            this.rotation[2] = axesRight[3];
        }

        this.handleStickRotation(this.rotation[0]);
    }

    onActivate() {
        // Add scroll event listener to the canvas to handle mouse scroll events for rotating the tile preview
        this.engine.canvas.addEventListener('wheel', this.onMouseScroll);
    }

    onDeactivate() {
        // remove the scroll event listener when the component is deactivated
        this.engine.canvas.removeEventListener('wheel', this.onMouseScroll);
    }

    private handleStickRotation(rotationValue: number): void {
        if (Math.abs(rotationValue) <= this.stickDeadzoneThreshold) {
            this.canRotateFromStick = true;
            return;
        }

        if (!this.canRotateFromStick || Math.abs(rotationValue) < this.stickTriggerThreshold) {
            return;
        }

        this.rotate(rotationValue < 0);
        this.canRotateFromStick = false;
    }

    private rotate(counterClockwise: boolean): void {
        if (counterClockwise) {
            this.gamePlayService.rotatePreviewTileCounterClockwise();
            return;
        }

        this.gamePlayService.rotatePreviewTileClockwise();
    }

    // Maybe something like this
    private onMouseScroll = (event: WheelEvent) => {
        if (Math.abs(event.deltaY) < this.mouseTriggerThreshold) {
            return;
        }

        this.rotate(event.deltaY < 0);
    };
}

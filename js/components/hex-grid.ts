import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {TilePrefabs} from './tile-prefabs.ts';
import {wlUtils} from '@sorskoot/wonderland-components';

export class HexGrid extends Component {
    static TypeName = 'hex-grid';

    @property.object({required: true})
    declare public tilePrefabsObject: Object3D;
    declare private tilePrefabs: TilePrefabs;

    init() {
        this.tilePrefabs = this.tilePrefabsObject.getComponent(TilePrefabs)!;
    }

    start() {
        setTimeout(() => {
            const t = this.tilePrefabs.spawn('Tile')!;
            t.resetPosition();
            t.parent = this.object;
            wlUtils.setActive(t, true);
        }, 1000);
    }

    update(dt: number) {}
}

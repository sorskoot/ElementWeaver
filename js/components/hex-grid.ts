import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {TilePrefabs} from './tile-prefabs.ts';
import {wlUtils} from '@sorskoot/wonderland-components';
import {serviceLocator} from '../utils/ServiceLocator.ts';
import {Services} from '../bootstrap-services.ts';
import {IGamePlayService} from '../services/GamePlayService.ts';

export class HexGrid extends Component {
    static TypeName = 'hex-grid';

    @property.object({required: true})
    declare public tilePrefabsObject: Object3D;
    declare private tilePrefabs: TilePrefabs;

    private get gamePlayService(): IGamePlayService {
        return serviceLocator.get<IGamePlayService>(Services.gamePlayService);
    }

    private hexTiles: Map<string, Object3D> = new Map();

    init() {
        this.tilePrefabs = this.tilePrefabsObject.getComponent(TilePrefabs)!;
    }

    start() {
        // setTimeout(() => {
        //     const t = this.tilePrefabs.spawn('Tile')!;
        //     t.resetPosition();
        //     t.parent = this.object;
        //     wlUtils.setActive(t, true);
        // }, 1000);
    }
    onActivate() {
        this.gamePlayService.onNewGame.add(this.onNewGame);
        this.gamePlayService.onTilesChanged.add(this.onTilesChanged);
    }

    onDeactivate() {
        this.gamePlayService.onNewGame.remove(this.onNewGame);
        this.gamePlayService.onTilesChanged.remove(this.onTilesChanged);
    }

    private onNewGame = () => {
        this.hexTiles.forEach((tile) => {
            if (tile && !tile.isDestroyed) {
                tile.destroy();
            }
        });
        this.hexTiles.clear();
    };

    private onTilesChanged = (changedTileIds: string[]) => {
        for (const tileId of changedTileIds) {
            // currently the only changes that are possible is that it's either a new tiles,
            // or a placeholder tile that is replaced by a normal one. If we have a tile with an ID
            // already in the game, we can assume that it's a placeholder that needs to be replaced.
            // So we deleted the existing tile and spawn a new one in its place.
            const existingTile = this.hexTiles.get(tileId);
            if (existingTile && !existingTile.isDestroyed) {
                existingTile.destroy();
                this.hexTiles.delete(tileId);
            }
            const tile = this.gamePlayService.getTile(tileId);
            if (tile) {
                const newTile = this.tilePrefabs.spawn('Tile')!;
                newTile.resetPosition();
                newTile.parent = this.object;
                const pos = tile.to2D();
                newTile.setPositionLocal([pos.x, 0, pos.y]);
                wlUtils.setActive(newTile, true);
                this.hexTiles.set(tileId, newTile);
            }
        }
    };
}

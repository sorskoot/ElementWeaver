import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {Services} from '../bootstrap-services.ts';
import {IGamePlayService} from '../services/GamePlayService.ts';
import {serviceLocator} from '../utils/ServiceLocator.ts';
import {HexTileElements, HexTilePiece} from '../types/HexTile.ts';
import {TilePrefabs} from './tile-prefabs.ts';
import {TileMaterials} from './tile-materials.ts';
import {ITileInteractionService} from '../services/TileInteractionService.ts';
import {vec3} from 'gl-matrix';

export class TilePreview extends Component {
    static TypeName = 'tile-preview';

    @property.object({required: true})
    declare public tilePrefabsObject: Object3D;
    declare private tilePrefabs: TilePrefabs;

    private previewTileObject?: Object3D;
    private previewMaterials?: TileMaterials;

    private get gamePlayService() {
        return serviceLocator.get<IGamePlayService>(Services.gamePlayService);
    }

    private get tileInteractionService() {
        return serviceLocator.get<ITileInteractionService>(Services.tileInteractionService);
    }

    private readonly defaultScale = [1, 1, 1];
    private currentPos = vec3.create();

    start() {
        this.tilePrefabs = this.tilePrefabsObject.getComponent(TilePrefabs)!;
    }

    onActivate() {
        this.gamePlayService.onTilePreviewChanged.add(this.onTilePreviewChanged);
        this.tileInteractionService.onTileHover.add(this.onTileHover);
        this.tileInteractionService.onTileClick.add(this.onTileUnhover);
        this.tileInteractionService.onTileUnhover.add(this.onTileUnhover);
    }

    onDeactivate() {
        this.gamePlayService.onTilePreviewChanged.remove(this.onTilePreviewChanged);
        this.tileInteractionService.onTileHover.remove(this.onTileHover);
        this.tileInteractionService.onTileClick.remove(this.onTileUnhover);
        this.tileInteractionService.onTileUnhover.remove(this.onTileUnhover);
    }

    private v = 0;
    update(dt: number) {
        if (!this.previewTileObject) {
            return;
        }
        this.currentPos[1] = Math.sin(this.v * 10) * 0.05 + 0.2;
        this.previewTileObject!.setPositionLocal(this.currentPos);
        this.v += dt;
    }

    private onTilePreviewChanged = (tileData: HexTilePiece) => {
        if (!this.previewTileObject) {
            // If the preview tile object hasn't been created yet, we can't update it.
            return;
        }

        this.previewMaterials?.setMaterials(tileData.elements);
    };

    private onTileHover = (tileId: string, tilePos: {x: number; y: number}) => {
        if (!this.previewTileObject) {
            this.createPreviewTileObject();
        }
        this.previewTileObject!.setScalingLocal(this.defaultScale);
        this.currentPos = [tilePos.x, 0.2, tilePos.y];
        this.previewTileObject!.setPositionLocal(this.currentPos);
    };

    private onTileUnhover = (tileId: string) => {
        if (!this.previewTileObject) {
            this.createPreviewTileObject();
        }
        this.previewTileObject!.setScalingWorld([0, 0, 0]);
    };

    private createPreviewTileObject() {
        this.previewTileObject = this.tilePrefabs.spawn('Tile')!;
        this.previewMaterials = this.previewTileObject.getComponent(TileMaterials)!;
        this.previewTileObject.resetPosition();
        this.previewTileObject.parent = this.object;
        this.previewTileObject.setScalingWorld([0, 0, 0]);
    }
}

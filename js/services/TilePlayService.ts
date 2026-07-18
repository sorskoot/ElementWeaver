import {IGamePlayService} from './GamePlayService.ts';
import {ITileInteractionService} from './TileInteractionService.ts';

export interface ITilePlayService {}

export class TilePlayService implements ITilePlayService {
    constructor(
        private gamePlayService: IGamePlayService,
        private tileInteractionService: ITileInteractionService
    ) {
        this.tileInteractionService.onTileClick.add(this.onTileClick);
    }

    private onTileClick = (tileId: string): void => {
        const tile = this.gamePlayService.getTile(tileId);
        if (tile) {
            this.gamePlayService.placeTile(tile);
        }
    };
}

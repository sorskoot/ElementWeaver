import {IGameModel} from '../models/GameModel.ts';
import {TileType} from '../types/HexTile.ts';

export interface IGamePlayService {
    newGame(): void;
}

export class GamePlayService implements IGamePlayService {
    constructor(private gameModel: IGameModel) {}

    newGame(): void {
        this.gameModel.clearGrid();

        // Add a randomized tile to the center of the grid
        this.gameModel.addTile(0, 0, 0, TileType.piece);

        // surround the center tile with 6 placeholder tiles
        this.surroundWithPlaceholders();
    }

    /**
     * Surrounds all piece tiles with placeholder tiles if empty spots exist.
     * @returns An array of IDs of the added placeholder tiles.
     */
    private surroundWithPlaceholders(): string[] {
        const addedTileIds: string[] = [];
        const allTiles = this.gameModel.getAllTiles();
        for (const tile of allTiles) {
            const neighbors = tile.neighbors();
            if (tile.type === TileType.piece) {
                // if the tile is a piece, check its neighbors and
                // add placeholder tiles if they don't exist
                for (const neighbor of neighbors) {
                    const neighborTile = this.gameModel.getTileAt(neighbor.x, neighbor.y, neighbor.z);
                    if (!neighborTile) {
                        // there's an empty spot next to a tile,
                        // so we should add a placeholder tile there
                        const addedTileId = this.gameModel.addTile(
                            neighbor.x,
                            neighbor.y,
                            neighbor.z,
                            TileType.placeholder
                        );

                        addedTileIds.push(addedTileId);
                    }
                }
            }
        }
        return addedTileIds;
    }
}

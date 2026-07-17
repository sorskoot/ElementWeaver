import {HexagonTile} from '../classes/HexagonTile.ts';
import {IGameModel} from '../models/GameModel.ts';
import {TileType} from '../types/HexTile.ts';
import {EventEmitter} from '../utils/Events.ts';

export interface IGamePlayService {
    /**
     * Starts a new game by clearing the grid and initializing it with a randomized tile and surrounding placeholder tiles.
     * Emits the onNewGame event and the onTilesChanged event with the IDs of the changed tiles.
     */
    newGame(): void;

    /**
     * Event emitted when a new game is started.
     */
    onNewGame: EventEmitter<[]>;

    /**
     * Event emitted when tiles are added, removed or changed in the grid.
     * The event provides an array of tile IDs that have changed.
     */
    onTilesChanged: EventEmitter<[string[]]>;

    getTile(tileId: string): HexagonTile | undefined;
}

export class GamePlayService implements IGamePlayService {
    constructor(private gameModel: IGameModel) {}

    onNewGame = new EventEmitter<[]>();
    onTilesChanged = new EventEmitter<[string[]]>();

    newGame(): void {
        console.log('Starting a new game...');
        this.gameModel.clearGrid();
        this.onNewGame.emit();

        const changedTileIds: string[] = [];
        // Add a randomized tile to the center of the grid
        const addedTileId = this.gameModel.addTile(0, 0, 0, TileType.piece);
        changedTileIds.push(addedTileId);

        // surround the center tile with 6 placeholder tiles
        const addedPlaceholderIds = this.surroundWithPlaceholders();
        changedTileIds.push(...addedPlaceholderIds);

        this.onTilesChanged.emit(changedTileIds);
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

    getTile(tileId: string): HexagonTile | undefined {
        return this.gameModel.getTileById(tileId);
    }
}

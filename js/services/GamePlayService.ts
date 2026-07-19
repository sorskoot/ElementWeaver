import {HexagonTile} from '../classes/HexagonTile.ts';
import {IGameModel} from '../models/GameModel.ts';
import {HexTileElements, HexTilePiece, TileType} from '../types/HexTile.ts';
import {EventEmitter} from '../utils/Events.ts';
import {IElementDistributionService} from './ElementDistributionService.ts';

export interface IGamePlayService {
    /**
     * Starts a new game by clearing the grid and initializing it with a randomized tile and surrounding placeholder tiles.
     * Emits the onNewGame event and the onTilesChanged event with the IDs of the changed tiles.
     */
    newGame(): void;

    getTile(tileId: string): HexagonTile | undefined;

    placeTile(tile: HexagonTile): void;

    getTileDataById(tileId: string): HexTileElements | undefined;

    rotatePreviewTileCounterClockwise(): void;

    rotatePreviewTileClockwise(): void;

    getNextTile(): HexTilePiece | undefined;

    /**
     * Event emitted when a new game is started.
     */
    onNewGame: EventEmitter<[]>;

    /**
     * Event emitted when tiles are added, removed or changed in the grid.
     * The event provides an array of tile IDs that have changed.
     */
    onTilesChanged: EventEmitter<[string[]]>;

    onTilePreviewChanged: EventEmitter<[HexTilePiece]>;
}

export class GamePlayService implements IGamePlayService {
    onNewGame = new EventEmitter<[]>();
    onTilesChanged = new EventEmitter<[string[]]>();
    onTilePreviewChanged = new EventEmitter<[HexTilePiece]>();

    private nextTile?: HexTilePiece;

    constructor(
        private elementDistributionService: IElementDistributionService,
        private gameModel: IGameModel
    ) {}

    newGame(): void {
        console.log('Starting a new game...');
        this.gameModel.clearGrid();
        this.onNewGame.emit();

        const changedTileIds: string[] = [];
        // Add a randomized tile to the center of the grid
        const addedTileId = this.gameModel.addTile(0, 0, 0, {
            id: '0,0,0',
            type: TileType.piece,
            elements: this.elementDistributionService.createRandomElementDistribution(false),
            rotation: 0,
        });
        changedTileIds.push(addedTileId);

        // surround the center tile with 6 placeholder tiles
        const addedPlaceholderIds = this.surroundWithPlaceholders();
        changedTileIds.push(...addedPlaceholderIds);

        this.onTilesChanged.emit(changedTileIds);

        this.createNextTilePreview();
    }

    createNextTilePreview(): void {
        const tileData = this.elementDistributionService.createRandomElementDistribution();
        this.nextTile = {
            id: `next-tile-preview-${Date.now()}`,
            type: TileType.piece,
            elements: tileData,
            rotation: 0,
        };
        this.onTilePreviewChanged.emit(this.nextTile);
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
                        const addedTileId = this.gameModel.addTile(neighbor.x, neighbor.y, neighbor.z, {
                            id: `${neighbor.x},${neighbor.y},${neighbor.z}`,
                            type: TileType.placeholder,
                        });

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

    placeTile(tile: HexagonTile): void {
        const existingTile = this.gameModel.getTileById(tile.id);
        if (existingTile && existingTile.type === TileType.placeholder) {
            const rotatedElements = this.elementDistributionService.rotateElements(
                this.nextTile!.elements,
                this.nextTile!.rotation
            );
            this.gameModel.addTile(tile.x, tile.y, tile.z, {
                id: `${tile.x},${tile.y},${tile.z}`,
                type: TileType.piece,
                elements: rotatedElements,
                rotation: 0,
            });
            this.checkMatches(tile.id);
            const changedTileIds: string[] = [tile.id];
            // surround the newly placed tile with placeholder tiles if empty spots exist
            const addedPlaceholderIds = this.surroundWithPlaceholders();
            changedTileIds.push(...addedPlaceholderIds);
            this.onTilesChanged.emit(changedTileIds);

            this.createNextTilePreview();
        }
    }

    getTileDataById(tileId: string): HexTileElements | undefined {
        return this.gameModel.getTileDataById(tileId);
    }

    getNextTile(): HexTilePiece | undefined {
        return this.nextTile;
    }

    rotatePreviewTileCounterClockwise(): void {
        if (this.nextTile && this.nextTile.type === TileType.piece) {
            this.nextTile.rotation = (this.nextTile.rotation + 5) % 6;
            this.onTilePreviewChanged.emit(this.nextTile);
        }
    }

    rotatePreviewTileClockwise(): void {
        if (this.nextTile && this.nextTile.type === TileType.piece) {
            this.nextTile.rotation = (this.nextTile.rotation + 1) % 6;
            this.onTilePreviewChanged.emit(this.nextTile);
        }
    }

    private checkMatches(tileId: string): void {
        const placedTile = this.gameModel.getTileById(tileId);
        if (!placedTile || placedTile.type !== TileType.piece) {
            return;
        }

        const placedTileData = this.gameModel.getTileDataById(placedTile.id);
        if (!placedTileData || placedTileData.type !== TileType.piece) {
            return;
        }

        const neighbors = placedTile.neighbors();

        const matchingNeighbors: HexagonTile[] = [];
        for (let i = 0; i < 6; i++) {
            const neighbor = neighbors[i];
            const neighborTile = this.gameModel.getTileAt(neighbor.x, neighbor.y, neighbor.z);
            if (neighborTile && neighborTile.type === TileType.piece) {
                const neighborTileData = this.gameModel.getTileDataById(neighborTile.id);
                if (neighborTileData && placedTileData && neighborTileData.type === TileType.piece) {
                    const placedElement = placedTileData.elements[i];
                    const neighborElement = neighborTileData.elements[(i + 3) % 6];
                    if (placedElement === neighborElement) {
                        matchingNeighbors.push(neighborTile);
                    } else if (placedElement === 'spirit' || neighborElement === 'spirit') {
                        // TK: Track special case.
                        matchingNeighbors.push(neighborTile);
                    }
                }
            }
        }
        console.log(`Matching neighbors:`, matchingNeighbors.length);
    }
}

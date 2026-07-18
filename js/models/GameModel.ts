import {HexagonTile} from '../classes/HexagonTile.ts';
import {HexagonGrid} from '../classes/HexGrid.ts';
import {HexTileElements as HexTileData, TileType} from '../types/HexTile.ts';

export interface IGameModel {
    /**
     * Clears all tiles from the grid
     */
    clearGrid(): void;

    /**
     * Returns all tiles currently in the grid
     */
    getAllTiles(): HexagonTile[];

    /**
     * Retrieves the tile at the specified cube coordinates, if it exists.
     * @param x
     * @param y
     * @param z
     */
    getTileAt(x: number, y: number, z: number): HexagonTile | undefined;

    /**
     * Adds a new tile to the grid at the specified cube coordinates with the given type.
     * @returns The ID of the newly added tile
     */
    addTile(x: number, y: number, z: number, type: TileType): string;

    /**
     * Gets a tile by its unique ID, if it exists in the grid.
     * @param tileId The unique ID of the tile to retrieve.
     * @returns The HexagonTile with the specified ID, or undefined if no such tile exists.
     */
    getTileById(tileId: string): HexagonTile | undefined;

    tileData: Map<string, HexTileData>;
}

export class GameModel implements IGameModel {
    private grid: HexagonGrid;

    tileData: Map<string, HexTileData> = new Map();

    constructor() {
        this.grid = new HexagonGrid();
    }

    clearGrid(): void {
        this.grid.clear();
        this.tileData.clear();
    }

    getAllTiles(): HexagonTile[] {
        return this.grid.getAllTiles();
    }

    getTileAt(x: number, y: number, z: number): HexagonTile | undefined {
        return this.grid.getTile(x, y, z);
    }

    getTileById(tileId: string): HexagonTile | undefined {
        return this.grid.getTileById(tileId);
    }
    getTileDataById(tileId: string): HexTileData | undefined {
        return this.tileData.get(tileId);
    }
    addTile(x: number, y: number, z: number, type: TileType): string {
        const newTile = new HexagonTile(x, y, z, type);
        this.grid.addTile(newTile);
        return newTile.id;
    }
}

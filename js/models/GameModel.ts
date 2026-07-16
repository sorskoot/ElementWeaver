import {HexagonTile} from '../classes/HexagonTile.ts';
import {HexagonGrid} from '../classes/HexGrid.ts';
import {TileType} from '../types/HexTile.ts';

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
}

export class GameModel implements IGameModel {
    private grid: HexagonGrid;

    constructor() {
        this.grid = new HexagonGrid();
    }

    clearGrid(): void {
        this.grid.clear();
    }

    getAllTiles(): HexagonTile[] {
        return this.grid.getAllTiles();
    }

    getTileAt(x: number, y: number, z: number): HexagonTile | undefined {
        return this.grid.getTile(x, y, z);
    }

    addTile(x: number, y: number, z: number, type: TileType): string {
        const newTile = new HexagonTile(x, y, z, type);
        this.grid.addTile(newTile);
        return newTile.id;
    }
}

import { Rotation } from "./Rotation.ts";
import { Six } from "./Six.ts";

type HexTileBase = {
    id: string;
    type: TileType;
};

type HexTilePiece = HexTileBase & {
    type: TileType.piece;
    readonly elements: Six<TileElementType>;
    /** 
     * rotation in steps */
    rotation: Rotation;
};

type HexTilePlaceholder = HexTileBase & {
    type: TileType.placeholder;
}

export type HexTileElements = HexTilePiece | HexTilePlaceholder;

export enum TileType {
    placeholder = 'placeholder',
    piece = 'piece',
}

export enum TileElementType{
    fire = 'fire',
    water = 'water',
    earth = 'earth',
    air = 'air',
    spirit = 'spirit',
}
/**
 * A tuple type representing a fixed-length array of six elements of type `T`.
 * This is useful for representing the six elements of a hexagonal tile.
 * @template T - The type of the elements in the tuple.
 */
export type Six<T> = [T, T, T, T, T, T];

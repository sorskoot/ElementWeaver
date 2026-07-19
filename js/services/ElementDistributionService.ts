import {rng} from '@sorskoot/wonderland-components';
import {TileElementType} from '../types/HexTile.ts';
import {Six} from '../types/Six.ts';

export interface IElementDistributionService {
    /**
     * Generates a random distribution of tile elements for a hexagonal tile.
     * Rules:
     * - Each tile consists of 6 elements.
     * - there's a 22% chance for the normal elements (fire, water, earth, air) to be selected
     * - there's a 11% chance for the spirit element to be selected
     * - there can be only one spirit element per tile
     * @returns An array of 6 TileElementType values representing the elements of the tile.
     * @param addSpirit Optional boolean to determine if the spirit element can be included in the distribution. Defaults to true.
     */
    createRandomElementDistribution(addSpirit?: boolean): Six<TileElementType>;

    /**
     * Shifts the elements of a hexagonal tile based on the specified rotation.
     * @param elements The current distribution of tile elements.
     * @param rotation The number of positions to shift the elements clockwise.
     */
    rotateElements(elements: Six<TileElementType>, rotation: number): Six<TileElementType>;
}

export class ElementDistributionService implements IElementDistributionService {
    createRandomElementDistribution(addSpirit: boolean = true): Six<TileElementType> {
        const elements: TileElementType[] = [];

        // Idea is that there's double the change of normal elements than there's the spirit element.
        // when the spirit element is selected, it's removed from the array so it only happens once.
        const availableElements = [
            TileElementType.fire,
            TileElementType.fire,
            TileElementType.water,
            TileElementType.water,
            TileElementType.earth,
            TileElementType.earth,
            TileElementType.air,
            TileElementType.air,
        ];
        if (addSpirit) {
            availableElements.push(TileElementType.spirit);
        }

        while (elements.length < 6) {
            let element = rng.getItem(availableElements);
            if (element === TileElementType.spirit) {
                availableElements.splice(availableElements.indexOf(TileElementType.spirit), 1);
            }
            elements.push(element);
        }
        return elements as Six<TileElementType>;
    }

    rotateElements(elements: Six<TileElementType>, rotation: number): Six<TileElementType> {
        const rotatedElements: TileElementType[] = [];
        for (let i = 0; i < 6; i++) {
            const rotatedIndex = (i + rotation) % 6;
            rotatedElements[i] = elements[rotatedIndex];
        }
        return rotatedElements as Six<TileElementType>;
    }
}

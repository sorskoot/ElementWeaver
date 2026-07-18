import type { Rotation } from "../types/Rotation.ts";

function rotationToDegrees(rotation: Rotation): number {
    return rotation * 60;
}


export const EWUtils = {
    rotationToDegrees,
}
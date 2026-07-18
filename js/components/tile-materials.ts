import { rng, wlUtils } from '@sorskoot/wonderland-components';
import { Component, Material, MeshComponent, Object3D, Property } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
import { TileElementType, TileType } from '../types/HexTile.ts';

export class TileMaterials extends Component {
    static TypeName = 'tile-materials';

    @property.material()
    fireMaterial?:Material;

    @property.material()
    waterMaterial?:Material;

    @property.material()
    earthMaterial?: Material;

    @property.material()
    airMaterial?: Material;

    @property.material()
    spiritMaterial?: Material;

    slices?: Object3D[];

    start() {
        this.slices = [
            this.object.findByNameRecursive('Slice1')[0],
            this.object.findByNameRecursive('Slice2')[0],
            this.object.findByNameRecursive('Slice3')[0],
            this.object.findByNameRecursive('Slice4')[0],
            this.object.findByNameRecursive('Slice5')[0],
            this.object.findByNameRecursive('Slice6')[0]
        ];
    }

    public setMaterials(types: TileElementType[]) {
        for (let i = 0; i < this.slices!.length; i++) {
            const slice = this.slices![i];
            const type = types[i];
            let material: Material | undefined;
            switch (type) {
                case TileElementType.fire:
                    material = this.fireMaterial;
                    break;
                case TileElementType.water:
                    material = this.waterMaterial;
                    break;
                case TileElementType.earth:
                    material = this.earthMaterial;
                    break;
                case TileElementType.air:
                    material = this.airMaterial;
                    break;
                case TileElementType.spirit:
                    material = this.spiritMaterial;
                    break;
            }
            if (material) {
                slice.getComponent(MeshComponent)!.material = material;
            }
        }
    }
}
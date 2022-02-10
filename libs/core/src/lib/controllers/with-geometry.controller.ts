// GENERATED
import {
    ContentChild,
    Directive,
    Input,
    NgModule,
    NgZone,
} from '@angular/core';
import * as THREE from 'three';
import { NgtGeometry } from '../three/geometry';
import { Controller, createControllerProviderFactory } from './controller';

@Directive({
    selector: `
    ngt-mesh,
    ngt-instanced-mesh,
    ngt-skinned-mesh,
    ngt-line,
    ngt-line-loop,
    ngt-line-segments,
    ngt-points
  `,
    exportAs: 'ngtWithGeometryController',
})
export class NgtWithGeometryController extends Controller {
    @Input() set geometry(v: THREE.BufferGeometry | undefined) {
        this._geometry = v;
    }

    get geometry() {
        return this._geometry;
    }

    private _geometry: THREE.BufferGeometry | undefined = undefined;

    @ContentChild(NgtGeometry, { static: true }) set contentGeometry(
        dir: NgtGeometry
    ) {
        if (dir) {
            this.zone.runOutsideAngular(() => {
                requestAnimationFrame(() => {
                    this.geometry = dir.geometry;
                });
            });
        }
    }

    constructor(private zone: NgZone) {
        super();
    }
}

@NgModule({
    declarations: [NgtWithGeometryController],
    exports: [NgtWithGeometryController],
})
export class NgtWithGeometryControllerModule {}

export const [
    NGT_WITH_GEOMETRY_WATCHED_CONTROLLER,
    NGT_WITH_GEOMETRY_CONTROLLER_PROVIDER,
] = createControllerProviderFactory({
    controller: NgtWithGeometryController,
    watchedControllerTokenName: 'Watched WithGeometryController',
});

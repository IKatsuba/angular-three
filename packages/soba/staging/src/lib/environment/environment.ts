import {
  NgtCanvasStore,
  NgtLoader,
  NgtStore,
  startWithUndefined,
  zonelessRequestAnimationFrame,
} from '@angular-three/core';
import { Directive, Input, NgModule, OnInit } from '@angular/core';
import { selectSlice } from '@rx-angular/state';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import * as THREE from 'three';
import { RGBELoader } from 'three-stdlib';
import { presetsObj, PresetsType } from './presets';

const CUBEMAP_ROOT =
  'https://rawcdn.githack.com/pmndrs/drei-assets/aa3600359ba664d546d05821bcbca42013587df2';

interface NgtSobaEnvironmentState {
  background?: boolean;
  texture: THREE.Texture;
  files?: string | string[];
  path?: string;
  scene?: THREE.Scene;
  extensions?: (loader: THREE.Loader) => void;
}

@Directive({
  selector: 'ngt-soba-environment',
  exportAs: 'ngtSobaEnvironment',
})
export class NgtSobaEnvironment
  extends NgtStore<NgtSobaEnvironmentState>
  implements OnInit
{
  @Input() set background(v: boolean) {
    this.set({ background: v });
  }

  @Input() set files(v: string | string[]) {
    this.set({ files: v });
  }

  @Input() set path(v: string) {
    this.set({ path: v });
  }

  @Input() set preset(v: PresetsType) {
    if (!(v in presetsObj)) {
      throw new Error(
        'Preset must be one of: ' + Object.keys(presetsObj).join(', ')
      );
    }
    this.set({ files: presetsObj[v], path: CUBEMAP_ROOT + '/hdri/' });
  }

  @Input() set scene(v: THREE.Scene) {
    this.set({ scene: v });
  }

  @Input() set extensions(v: (loader: THREE.Loader) => void) {
    this.set({ extensions: v });
  }

  private textureParams$ = combineLatest([
    this.select(selectSlice(['files', 'path'])),
    this.select('extensions').pipe(startWithUndefined()),
  ]).pipe(
    map(([{ path, files }, extensions]) => {
      const loader = this.isCubeMap ? THREE.CubeTextureLoader : RGBELoader;
      const urls = this.isCubeMap ? [files] : files;
      return { loader, urls, path, extensions };
    })
  );

  private environmentParams$ = combineLatest([
    this.select(selectSlice(['texture', 'background'])),
    this.select('scene').pipe(startWithUndefined()),
  ]).pipe(
    map(([{ texture, background }, scene]) => ({ texture, background, scene }))
  );

  constructor(private loader: NgtLoader, private canvasStore: NgtCanvasStore) {
    super();
    this.set({
      background: false,
      files: ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
      path: '',
      scene: undefined,
      extensions: undefined,
    });
  }

  ngOnInit() {
    zonelessRequestAnimationFrame(() => {
      this.hold(
        this.textureParams$.pipe(
          switchMap(({ path, extensions, loader, urls }) =>
            // @ts-ignore
            this.loader.use(loader, urls, (innerLoader) => {
              innerLoader.setPath(path!);
              if (extensions) {
                extensions(innerLoader);
              }
            })
          )
        ) as Observable<THREE.Texture>,
        (textureResult) => {
          const renderer = this.canvasStore.get('renderer');
          const gen = new THREE.PMREMGenerator(renderer!);
          const texture = NgtSobaEnvironment.getTexture(
            textureResult,
            gen,
            this.isCubeMap
          ) as THREE.Texture;
          gen.dispose();

          this.set({ texture });
        }
      );

      this.effect(this.environmentParams$, ({ texture, scene, background }) => {
        const defaultScene = this.canvasStore.get('scene');
        const oldBg = scene ? scene.background : defaultScene!.background;
        const oldEnv = scene ? scene.environment : defaultScene!.environment;

        if (scene) {
          scene.environment = texture!;
          if (background) scene.background = texture!;
        } else {
          defaultScene!.environment = texture!;
          if (background) defaultScene!.background = texture!;
        }

        return () => {
          if (scene) {
            scene.environment = oldEnv;
            scene.background = oldBg;
          } else {
            defaultScene!.environment = oldEnv;
            defaultScene!.background = oldBg;
          }
          texture.dispose();
        };
      });
    });
  }

  private get isCubeMap() {
    return Array.isArray(this.get('files'));
  }

  private static getTexture(
    texture: THREE.Texture | THREE.CubeTexture,
    gen: THREE.PMREMGenerator,
    isCubeMap: boolean
  ) {
    if (isCubeMap) {
      gen.compileEquirectangularShader();
      return gen.fromCubemap(texture as THREE.CubeTexture).texture;
    }
    return gen.fromEquirectangular(texture).texture;
  }
}

@NgModule({
  declarations: [NgtSobaEnvironment],
  exports: [NgtSobaEnvironment],
})
export class NgtSobaEnvironmentModule {}

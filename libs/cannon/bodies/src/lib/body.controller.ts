// GENERATED
import {
    ArgFn,
    AtomicName,
    BodyProps,
    BodyShapeType,
    CannonWorker,
    GetByIndex,
    NgtPhysicsState,
    NgtPhysicsStore,
    PropValue,
    SetOpName,
    SubscriptionName,
    SubscriptionTarget,
    VectorName,
    WorkerApi,
} from '@angular-three/cannon';
import { NgtCannonConstraintController } from '@angular-three/cannon/constraints';
import { NgtCannonDebug } from '@angular-three/cannon/debug';
import {
    AnyFunction,
    Controller,
    createControllerProviderFactory,
    NGT_OBJECT_INPUTS_WATCHED_CONTROLLER,
    NGT_PARENT_OBJECT,
    NgtCanvasStore,
    NgtObject3dProps,
    NgtObjectInputsController,
    NgtStore,
    NgtTriplet,
    startWithUndefined,
    tapEffect,
} from '@angular-three/core';
import {
    Directive,
    Inject,
    InjectionToken,
    Input,
    NgModule,
    NgZone,
    OnInit,
    Optional,
    Self,
    SimpleChanges,
} from '@angular/core';
import { startWith } from 'rxjs';
import * as THREE from 'three';
import {
    capitalize,
    getUUID,
    prepare,
    quaternionToRotation,
    setupCollision,
} from './utils';

const temp = new THREE.Object3D();

let incrementingId = 0;

function subscribe<T extends SubscriptionName>(
    ref: THREE.Object3D,
    worker: CannonWorker,
    subscriptions: NgtPhysicsState['subscriptions'],
    type: T,
    index?: number,
    target: SubscriptionTarget = 'bodies'
) {
    return (callback: (value: PropValue<T>) => void) => {
        const id = incrementingId++;
        subscriptions[id] = { [type]: callback };
        const uuid = getUUID(ref, index);
        uuid &&
            worker.postMessage({
                op: 'subscribe',
                uuid,
                props: { id, type, target },
            });
        return () => {
            delete subscriptions[id];
            worker.postMessage({ op: 'unsubscribe', props: id });
        };
    };
}

export const NGT_CANNON_BODY_ARGS_FN = new InjectionToken<ArgFn<unknown>>(
    'ArgsFn for NgtCannonBody',
    {
        providedIn: 'root',
        factory:
            () =>
            (...args: unknown[]) =>
                args,
    }
);

export const NGT_CANNON_BODY_TYPE = new InjectionToken<BodyShapeType>(
    'Body Type for Cannon'
);

export interface NgtCannonBodyState {
    getPhysicProps?: GetByIndex<BodyProps>;
    object3d?: THREE.Object3D;
}

@Directive({
    selector: `
        [ngtPhysicBox],
        [ngtPhysicPlane],
        [ngtPhysicCylinder],
        [ngtPhysicHeightfield],
        [ngtPhysicParticle],
        [ngtPhysicSphere],
        [ngtPhysicTrimesh],
        [ngtPhysicConvexPolyhedron],
        [ngtPhysicCompound]
    `,
    exportAs: 'ngtCannonBody',
    providers: [NgtStore],
})
export class NgtCannonBodyController extends Controller implements OnInit {
    @Input() set getPhysicProps(fn: GetByIndex<BodyProps> | undefined) {
        this.store.set({ getPhysicProps: fn });
    }

    private cannonPropsParams$ = this.store.select(
        this.store.select((s) => s.getPhysicProps).pipe(startWithUndefined()),
        this.objectInputsController.changes$.pipe(startWith({})),
        (getPhysicsProps, inputChanges) => ({ getPhysicsProps, inputChanges })
    );

    constructor(
        private zone: NgZone,
        private store: NgtStore<NgtCannonBodyState>,
        private canvasStore: NgtCanvasStore,
        @Optional()
        @Inject(NGT_OBJECT_INPUTS_WATCHED_CONTROLLER)
        private objectInputsController: NgtObjectInputsController,
        @Inject(NGT_CANNON_BODY_ARGS_FN) private argsFn: ArgFn<unknown>,
        @Optional() @Inject(NGT_CANNON_BODY_TYPE) private type: BodyShapeType,
        @Optional() private physicsStore: NgtPhysicsStore,
        @Optional()
        private cannonConstraintController: NgtCannonConstraintController,
        @Optional() private cannonDebug: NgtCannonDebug,
        @Optional()
        @Self()
        @Inject(NGT_PARENT_OBJECT)
        private parentObjectFn: AnyFunction
    ) {
        super();

        if (!type) {
            throw new Error('NGT_CANNON_BODY_TYPE is required');
        }

        if (!parentObjectFn) {
            throw new Error(
                '[ngtCannon***] directive can only be used on an Object3D'
            );
        }

        if (!physicsStore) {
            throw new Error(
                '[ngtCannon***] directive can only be used inside of <ngt-physics>'
            );
        }

        this.store.set({
            getPhysicProps: undefined,
        });
    }

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            this.store.onCanvasReady(this.canvasStore.ready$, () => {
                this.store.set({ object3d: this.parentObjectFn?.() });
                this.initWorker(this.cannonPropsParams$);

                if (this.cannonConstraintController) {
                    this.cannonConstraintController.setBodies(this.object3d);
                }
            });
        });
    }

    get object3d(): THREE.Object3D {
        return this.store.get((s) => s.object3d) as THREE.Object3D;
    }

    get api(): WorkerApi & { at: (index: number) => WorkerApi } {
        this.store.set({ object3d: this.parentObjectFn?.() });
        const { worker, subscriptions } = this.physicsStore.get();
        const object3d = this.store.get((s) => s.object3d)!;
        const makeAtomic = <T extends AtomicName>(type: T, index?: number) => {
            const op: SetOpName<T> = `set${capitalize(type)}`;
            return {
                set: (value: PropValue<T>) => {
                    const uuid = getUUID(object3d, index);
                    uuid && worker.postMessage({ op, props: value, uuid });
                },
                subscribe: subscribe(
                    object3d,
                    worker,
                    subscriptions,
                    type,
                    index
                ),
            };
        };

        const makeQuaternion = (index?: number) => {
            const op = 'setQuaternion';
            const type = 'quaternion';
            return {
                set: (x: number, y: number, z: number, w: number) => {
                    const uuid = getUUID(object3d, index);
                    uuid &&
                        worker.postMessage({
                            op,
                            props: [x, y, z, w],
                            uuid,
                        });
                },
                copy: ({ w, x, y, z }: THREE.Quaternion) => {
                    const uuid = getUUID(object3d, index);
                    uuid &&
                        worker.postMessage({
                            op,
                            props: [x, y, z, w],
                            uuid,
                        });
                },
                subscribe: subscribe(
                    object3d,
                    worker,
                    subscriptions,
                    type,
                    index
                ),
            };
        };

        const makeRotation = (index?: number) => {
            const op = 'setRotation';
            return {
                set: (x: number, y: number, z: number) => {
                    const uuid = getUUID(object3d, index);
                    uuid && worker.postMessage({ op, props: [x, y, z], uuid });
                },
                copy: ({ x, y, z }: THREE.Vector3 | THREE.Euler) => {
                    const uuid = getUUID(object3d, index);
                    uuid && worker.postMessage({ op, props: [x, y, z], uuid });
                },
                subscribe: (callback: (value: NgtTriplet) => void) => {
                    const id = incrementingId++;
                    const target = 'bodies';
                    const type = 'quaternion';
                    const uuid = getUUID(object3d, index);

                    subscriptions[id] = {
                        [type]: quaternionToRotation(callback),
                    };
                    uuid &&
                        worker.postMessage({
                            op: 'subscribe',
                            uuid,
                            props: { id, type, target },
                        });
                    return () => {
                        delete subscriptions[id];
                        worker.postMessage({ op: 'unsubscribe', props: id });
                    };
                },
            };
        };

        const makeVec = (type: VectorName, index?: number) => {
            const op: SetOpName<VectorName> = `set${capitalize(
                type
            )}` as SetOpName<VectorName>;
            return {
                set: (x: number, y: number, z: number) => {
                    const uuid = getUUID(object3d, index);
                    uuid && worker.postMessage({ op, props: [x, y, z], uuid });
                },
                copy: ({ x, y, z }: THREE.Vector3 | THREE.Euler) => {
                    const uuid = getUUID(object3d, index);
                    uuid && worker.postMessage({ op, props: [x, y, z], uuid });
                },
                subscribe: subscribe(
                    object3d,
                    worker,
                    subscriptions,
                    type,
                    index
                ),
            };
        };

        function makeApi(index?: number): WorkerApi {
            return {
                angularFactor: makeVec('angularFactor', index),
                angularVelocity: makeVec('angularVelocity', index),
                linearFactor: makeVec('linearFactor', index),
                position: makeVec('position', index),
                quaternion: makeQuaternion(index),
                rotation: makeRotation(index),
                velocity: makeVec('velocity', index),
                allowSleep: makeAtomic('allowSleep', index),
                angularDamping: makeAtomic('angularDamping', index),
                collisionFilterGroup: makeAtomic('collisionFilterGroup', index),
                collisionFilterMask: makeAtomic('collisionFilterMask', index),
                collisionResponse: makeAtomic('collisionResponse', index),
                isTrigger: makeAtomic('isTrigger', index),
                fixedRotation: makeAtomic('fixedRotation', index),
                linearDamping: makeAtomic('linearDamping', index),
                mass: makeAtomic('mass', index),
                material: makeAtomic('material', index),
                sleepSpeedLimit: makeAtomic('sleepSpeedLimit', index),
                sleepTimeLimit: makeAtomic('sleepTimeLimit', index),
                userData: makeAtomic('userData', index),
                // Apply functions
                applyForce(
                    this: NgtCannonBodyController,
                    force: NgtTriplet,
                    worldPoint: NgtTriplet
                ) {
                    const uuid = getUUID(object3d, index);
                    uuid &&
                        worker.postMessage({
                            op: 'applyForce',
                            props: [force, worldPoint],
                            uuid,
                        });
                },
                applyImpulse(
                    this: NgtCannonBodyController,
                    impulse: NgtTriplet,
                    worldPoint: NgtTriplet
                ) {
                    const uuid = getUUID(object3d, index);
                    uuid &&
                        worker.postMessage({
                            op: 'applyImpulse',
                            props: [impulse, worldPoint],
                            uuid,
                        });
                },
                applyLocalForce(
                    this: NgtCannonBodyController,
                    force: NgtTriplet,
                    localPoint: NgtTriplet
                ) {
                    const uuid = getUUID(object3d, index);
                    uuid &&
                        worker.postMessage({
                            op: 'applyLocalForce',
                            props: [force, localPoint],
                            uuid,
                        });
                },
                applyLocalImpulse(
                    this: NgtCannonBodyController,
                    impulse: NgtTriplet,
                    localPoint: NgtTriplet
                ) {
                    const uuid = getUUID(object3d, index);
                    uuid &&
                        worker.postMessage({
                            op: 'applyLocalImpulse',
                            props: [impulse, localPoint],
                            uuid,
                        });
                },
                applyTorque(this: NgtCannonBodyController, torque: NgtTriplet) {
                    const uuid = getUUID(object3d, index);
                    uuid &&
                        worker.postMessage({
                            op: 'applyTorque',
                            props: [torque],
                            uuid,
                        });
                },
                // force particular sleep state
                sleep(this: NgtCannonBodyController) {
                    const uuid = getUUID(object3d, index);
                    uuid && worker.postMessage({ op: 'sleep', uuid });
                },
                wakeUp(this: NgtCannonBodyController) {
                    const uuid = getUUID(object3d, index);
                    uuid && worker.postMessage({ op: 'wakeUp', uuid });
                },
            };
        }

        const cache: { [index: number]: WorkerApi } = {};
        return {
            ...makeApi(undefined),
            at: (index: number) =>
                cache[index] || (cache[index] = makeApi(index)),
        };
    }

    private readonly initWorker = this.store.effect<{
        getPhysicsProps: GetByIndex<BodyProps> | undefined;
        inputChanges: SimpleChanges;
    }>(
        tapEffect(() => {
            this.store.set({ object3d: this.parentObjectFn?.() });
            let uuid: string[] = [];
            const {
                worker: currentWorker,
                refs,
                events,
            } = this.physicsStore.get();

            const object =
                this.store.get((s) => s.object3d) || new THREE.Object3D();

            let objectCount = 1;

            if (object instanceof THREE.InstancedMesh) {
                object.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
                objectCount = object.count;
            }

            uuid =
                object instanceof THREE.InstancedMesh
                    ? new Array(objectCount)
                          .fill(0)
                          .map((_, i) => `${object.uuid}/${i}`)
                    : [object.uuid];

            const props: (BodyProps & { args: unknown })[] = uuid.map(
                (id, i) => {
                    const physicProps = this.getByIndex(i);
                    prepare(temp, physicProps);
                    if (object instanceof THREE.InstancedMesh) {
                        object.setMatrixAt(i, temp.matrix);
                        object.instanceMatrix.needsUpdate = true;
                    }
                    refs[id] = object;
                    if (this.cannonDebug) {
                        this.cannonDebug.api.add(id, physicProps, this.type);
                    }
                    setupCollision(events, physicProps, id);
                    return {
                        ...physicProps,
                        args: this.argsFn(physicProps.args),
                    };
                }
            );

            // Register on mount, unregister on unmount
            currentWorker.postMessage({
                op: 'addBodies',
                type: this.type,
                uuid,
                props: props.map(
                    ({
                        onCollide,
                        onCollideBegin,
                        onCollideEnd,
                        ...serializableProps
                    }) => {
                        return {
                            onCollide: Boolean(onCollide),
                            ...serializableProps,
                        };
                    }
                ),
            });

            return () => {
                if (currentWorker) {
                    uuid.forEach((id) => {
                        delete refs[id];
                        if (this.cannonDebug) {
                            this.cannonDebug.api.remove(id);
                        }
                        delete events[id];
                    });
                    currentWorker.postMessage({ op: 'removeBodies', uuid });
                }
            };
        })
    );

    private getByIndex(index: number): BodyProps & NgtObject3dProps {
        const getPhysicProps = this.store.get((s) => s.getPhysicProps);
        const physicsProps = getPhysicProps
            ? getPhysicProps(index)
            : ({} as BodyProps);

        return {
            ...this.objectInputsController.object3dProps,
            ...physicsProps,
        } as BodyProps & NgtObject3dProps;
    }
}

@NgModule({
    declarations: [NgtCannonBodyController],
    exports: [NgtCannonBodyController],
})
export class NgtCannonBodyControllerModule {}

export const [
    NGT_CANNON_BODY_WATCHED_CONTROLLER,
    NGT_CANNON_BODY_CONTROLLER_PROVIDER,
] = createControllerProviderFactory({
    watchedControllerTokenName: 'Watched CannonBodyController',
    controller: NgtCannonBodyController,
});

import {
  ChangeDetectorRef,
  Directive,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Optional,
  Provider,
  SimpleChanges,
  Type,
} from '@angular/core';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { NgtDestroyedService } from '../services/destroyed.service';
import { UnknownRecord } from '../types';

@Directive()
export abstract class Controller implements OnChanges, OnInit {
  @Input() disabled = false;

  abstract get props(): string[];

  abstract get controller(): Controller | undefined;

  readonly change$ = new ReplaySubject<SimpleChanges>(1);

  constructor(protected ngZone: NgZone) {}

  #readyFn?: () => void;

  set readyFn(v: (() => void) | undefined) {
    this.#readyFn = v;
  }

  get readyFn() {
    return this.#readyFn;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.controller) {
      this.#assignProps();
      this.controller.ngOnChanges(changes);
      this.change$.next(changes);
    } else {
      this.change$.next(changes);
    }
  }

  ngOnInit() {
    if (this.controller) {
      this.#assignProps();
    }
  }

  #assignProps() {
    this.ngZone.runOutsideAngular(() => {
      this.props.forEach((prop) => {
        const selfController = this as UnknownRecord;
        const inputController = this.controller as unknown as UnknownRecord;
        selfController[prop] = selfController[prop] ?? inputController[prop];
      });
    });
  }
}

export interface CreateControllerTokenFactoryOptions<
  TController extends Controller
> {
  watchedControllerTokenName: string;
  controller: Type<TController>;
  newInstanceOnNull?: boolean;
}

export function controllerFactory<TController extends Controller>(
  newInstanceOnNull = false,
  controllerType: Type<TController>
) {
  return (
    controller: TController | null,
    changeDetectorRef: ChangeDetectorRef,
    destroyed: Observable<void>
  ): TController | null => {
    if (!controller) {
      return newInstanceOnNull ? new controllerType() : null;
    }

    controller.change$.pipe(takeUntil(destroyed)).subscribe(() => {
      changeDetectorRef.markForCheck();
    });

    return controller;
  };
}

export function createControllerProviderFactory<
  TController extends Controller
>({
  watchedControllerTokenName,
  controller,
  newInstanceOnNull = false,
}: CreateControllerTokenFactoryOptions<TController>): [
  InjectionToken<TController>,
  Provider[]
] {
  const watchedControllerToken = new InjectionToken(watchedControllerTokenName);

  const controllerProvider: Provider[] = [
    NgtDestroyedService,
    {
      provide: watchedControllerToken,
      deps: [
        [new Optional(), controller],
        ChangeDetectorRef,
        NgtDestroyedService,
      ],
      useFactory: controllerFactory(newInstanceOnNull, controller),
    },
  ];

  return [watchedControllerToken, controllerProvider];
}

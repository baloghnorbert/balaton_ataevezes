/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect as connectToStore } from "ts-lite-store/connect";
import { Observer as ObserverType } from "ts-lite-store/observer";
import { Store } from "ts-lite-store/store";
import { IAppState } from "./app.state";

export const connect = <TProps, TRes extends Partial<TProps>, TObserver extends ObserverType>
(
    Comp: React.ComponentType<TProps>,
    Observer: (new(...args: any) => TObserver) | undefined,
    map: (store: Store<IAppState>, observer: TObserver | undefined) => TRes
) => connectToStore
(
    Comp,
    map,
    Observer,
);

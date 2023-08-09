import type { SvelteComponent } from 'svelte';

import { MidiAction } from "./Midi/MidiAction";
import { KeyboardAction } from "./Keyboard/KeyboardAction";
import { LayerAction } from "./Layer/LayerAction";
import { WrapAction } from './Wrap/WrapAction';
import { ColorEffect } from "./Color/ColorEffect";

export type ActionInfoType = "Title" | "Subtitle" | "Center" | "Color"

// Both Action and Effects extends on top of this
export interface Action {
    static readonly identifier: string;
    static readonly description: string;
    static readonly icon: SvelteComponent;
    static readonly body: SvelteComponent;

    constructor(): void;
    import(data: any[]): boolean;
    export(): any[] | undefined; //If undefined, then the action is not valid and should not be exported
    info(type: ActionInfoType): string | null;
}

export type { Action as Effect}

export const actions : {[actionIdentifier:string]: Action} = {
    "midi": MidiAction,
    "keyboard":  KeyboardAction,
    "layer":  LayerAction,
    "wrap":  WrapAction,
};

export const effects : {[actionIdentifier:string]: Effect} = {
    "color": ColorEffect
}

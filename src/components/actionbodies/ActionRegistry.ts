import type { SvelteComponent } from 'svelte';

import { MidiAction } from "./Midi/MidiAction";
import { KeyboardAction } from "./Keyboard/KeyboardAction";
import { LayerAction } from "./Layer/LayerAction";
import { WrapAction } from './Wrap/WrapAction';
import { MacroAction } from './Macro/MacroAction';
import { GamepadAction } from "./Gamepad/GamepadAction";
import { MultiAction } from "./Multi/MultiAction";

import { ColorEffect } from "./Color/ColorEffect";
import { ActionColorEffect } from "./ActionColor/ActionColorEffect";
import { MidiColorEffect } from "./MidiColor/MidiColorEffect";

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
    [MidiAction.identifier]: MidiAction,
    [KeyboardAction.identifier]:  KeyboardAction,
    [GamepadAction.identifier]:  GamepadAction,
    [LayerAction.identifier]:  LayerAction,
    [WrapAction.identifier]:  WrapAction,
    // [MultiAction.identifier]:  MultiAction,
    // [MacroAction.identifier]:  MacroAction,
};

export const effects : {[actionIdentifier:string]: Effect} = {
    [ColorEffect.identifier]: ColorEffect,
    [ActionColorEffect.identifier]: ActionColorEffect,
    // [MidiColorEffect.identifier]: MidiColorEffect,
}

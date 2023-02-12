import type { SvelteComponent } from 'svelte';

import { MidiAction } from "./Midi/MidiAction";
import { KeyboardAction } from "./Keyboard/KeyboardAction";

export interface Action {
    static readonly identifier: string;
    static readonly description: string;
    static readonly icon: SvelteComponent;
    static readonly body: SvelteComponent;

    constructor(): void;
    import(data: any[]): boolean;
    export(): any[];
    summary(): object;
}

export const actions : {[actionIdentifier:string]: Action} = {
    "midi": MidiAction,
    "keyboard":  KeyboardAction,
};

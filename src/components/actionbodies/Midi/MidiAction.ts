import type { Action } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import MidiActionBody from "./MidiActionBody.svelte";
import { Music } from "carbon-icons-svelte";
import type { MidiActionData } from "./MidiActionData";

export class MidiAction implements Action {
    static readonly identifier: string = "midi";
    static readonly description: string = "Play a Midi Note";
    static readonly icon: SvelteComponent = Music;
    static readonly body: SvelteComponent = MidiActionBody;

    data: MidiActionData;

    constructor() {
        this.data = {
            type: "Note",
            data: {
                key: 60,
                velocity: true,
                channel: 1
            }
        }
    }

    import(data: any[]): boolean {
        return false;
    }

    export(): any[] {
        return [];
    }

    summary(): object {
        return {};
    }
}
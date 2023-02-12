import type { Action } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import KeyboardActionBody from "./KeyboardActionBody.svelte";
import { Keyboard } from "carbon-icons-svelte";
import type { KeyboardActionData } from "./KeyboardActionData";

export class KeyboardAction implements Action {
    static readonly identifier: string = "keyboard";
    static readonly description: string = "Simulate a Keyboard Key";
    static readonly icon: SvelteComponent = Keyboard;
    static readonly body: SvelteComponent = KeyboardActionBody;

    data: KeyboardActionData;

    constructor() {
        this.data = {
            key: undefined
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
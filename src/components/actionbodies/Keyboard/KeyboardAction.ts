import type { Action, ActionInfoType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import KeyboardActionBody from "./KeyboardActionBody.svelte";
import { Keyboard } from "carbon-icons-svelte";
import type { KeyboardActionData } from "./KeyboardActionData";
import {KeyboardScanCode, KeyboardScanCodeShortName} from "./ScanCode";

import {t} from "$lib/translations";

export class KeyboardAction implements Action {
    static readonly identifier: string = "keyboard";
    static readonly description: string = "keyboard.description";
    static readonly icon: SvelteComponent = Keyboard;
    static readonly body: SvelteComponent = KeyboardActionBody;

    data: KeyboardActionData;

    constructor() {
        this.data = {
            key: undefined,
            user_keycode: 0
        }
    }

    import(data: any[]): boolean {
        if(data.length > 2) return false;
        this.data.key = data[0];

        if(data.length == 2)
        {
            this.data.user_keycode = data[1];
        }
        return true;
    }

    export(): any[] | undefined {
        if(this.data.key == undefined) return undefined
        if(this.data.key == KeyboardScanCode.KEY_USER_DEFINED)
        {
            return [this.data.key, this.data.user_keycode];
        }
        return [this.data.key];
    }

    info(type: ActionInfoType): string | null{
        switch(type)
        {
            case "Title":
                return "keyboard.previewTitle";
            case "Subtitle":
                if (this.data.key !== undefined) {
                    return KeyboardScanCodeShortName[this.data.key]
                }
                return "keyboard.none";
        }
        return null;
    }
}
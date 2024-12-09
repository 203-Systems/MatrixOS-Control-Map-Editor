import type { Action, ActionInfoType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import GamepadActionBody from "./GamepadActionBody.svelte";
import { GameConsole  } from "carbon-icons-svelte";
import type { GamepaddActionData } from "./GamepadActionData";
import {GamepadKeycodeFriendlyName, GamepadDpadDirection, AnalogSource} from "./GamepadActionData";

export class GamepadAction implements Action {
    static readonly identifier: string = "Game Controller";
    static readonly description: string = "Send a Game Controller Key";
    static readonly icon: SvelteComponent = GameConsole;
    static readonly body: SvelteComponent = GamepadActionBody;

    data: GamepaddActionData;

    constructor() {
        this.data = {
            key: undefined,
            analog: AnalogSource.KeyForce,
            begin: 0,
            end: 1,
            dpad: GamepadDpadDirection.GAMEPAD_DPAD_CENTERED
        }
    }

    import(data: any[]): boolean {
        if(data.length != 1) return false;
        this.data.key = data[0];
        return true;
    }

    export(): any[] | undefined {
        if(this.data.key == undefined) return undefined
        return [this.data.key];
    }

    info(type: ActionInfoType): string | null{
        switch(type)
        {
            case "Title":
                return "Game"
            case "Subtitle":
                if (this.data.key !== undefined) {
                    return GamepadKeycodeFriendlyName[this.data.key]
                }
                return "None"
        }
        return null;
    }
}
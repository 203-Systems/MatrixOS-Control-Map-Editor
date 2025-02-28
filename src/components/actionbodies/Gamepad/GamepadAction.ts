import type { Action, ActionInfoType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import GamepadActionBody from "./GamepadActionBody.svelte";
import { GameConsole  } from "carbon-icons-svelte";
import type { GamepadActionData } from "./GamepadActionData";
import {GamepadKeycodeFriendlyName, GamepadDpadDirection, AnalogSource, GamepadKeycode} from "./GamepadActionData";

import { GamepadDpadDirectionFriendlyName } from "./GamepadActionData";

export class GamepadAction implements Action {
    static readonly identifier: string = "gamepad";
    static readonly description: string = "gamepad.description";
    static readonly icon: SvelteComponent = GameConsole;
    static readonly body: SvelteComponent = GamepadActionBody;

    data: GamepadActionData;

    constructor() {
        this.data = {
            actionIdentifier: GamepadAction.identifier,
            key: undefined,
            analog: AnalogSource.KeyForce,
            begin: 0,
            end: 1,
            dpad: GamepadDpadDirection.GAMEPAD_DPAD_CENTERED
        }
    }

    import(data: any[]): boolean {
        try
        {
            if(data.length > 4) return false;
            this.data.key = data[0];

            if(this.data.key == GamepadKeycode.GAMEPAD_DPAD)
            {
                this.data.dpad = data[1];
            }
            else if(this.data.key >= GamepadKeycode.GAMEPAD_X_AXIS && this.data.key <= GamepadKeycode.GAMEPAD_RZ_AXIS)
            {
                this.data.analog = data[1];
                this.data.begin = data[2] / 65534 * 2 - 1;
                this.data.end = data[3] / 65534 * 2 - 1;
            }
            return true;
        }
        catch (error)
        {
            throw new Error("GamepadAction: Import Failed");
            return false;
        }
    }

    export(): any[] | undefined {
        var data:number[] = []
        data.push(this.data.key);

        if(this.data.key == GamepadKeycode.GAMEPAD_DPAD)
        {
            data.push(this.data.dpad);
        }
        else if(this.data.key >= GamepadKeycode.GAMEPAD_X_AXIS && this.data.key <= GamepadKeycode.GAMEPAD_RZ_AXIS)
        {
            data.push(this.data.analog);
            data.push(Math.round((this.data.begin + 1) * 65534 / 2));
            data.push(Math.round((this.data.end + 1) * 65534 / 2));
            console.log(`Mapped analog begin: ${this.data.begin} to ${data[2]}`);
            console.log(`Mapped analog end: ${this.data.end} to ${data[3]}`);
        }

        return data;
    }

    info(type: ActionInfoType): string | null{
        switch(type)
        {
            case "Title":
                return "gamepad.previewTitle";
            case "Subtitle":
                if (this.data.key !== undefined) {
                    return GamepadKeycodeFriendlyName[this.data.key]
                }
                return "gamepad.none";
        }
        return null;
    }
}
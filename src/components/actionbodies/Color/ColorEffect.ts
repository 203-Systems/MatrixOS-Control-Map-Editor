import type {Action, ActionInfoType} from "../ActionRegistry";
import type {SvelteComponent} from 'svelte';

import ColorEffectBody from "./ColorEffectBody.svelte";
import {ColorPalette} from "carbon-icons-svelte";
import type {ColorEffectData} from "./ColorEffectData";

export class ColorEffect implements Action {
    static readonly type: string = "effect";
    static readonly identifier: string = "color";
    static readonly description: string = "Color";
    static readonly icon: SvelteComponent = ColorPalette;
    static readonly body: SvelteComponent = ColorEffectBody;

    data: ColorEffectData;

    constructor() {
        this.data = {
            red: 1,
            green: 0,
            blue: 0
        }
    }

    import(data: any[]): boolean {
        try
        {
            return true
        }
        catch (error)
        {
            console.error("ColorEffect: Import Failed");
            return false;
        }
    }

    export(): any[] | undefined {
        return [];
    }

    info(type: ActionInfoType): string | null{
        switch(type)
        {
            case "Color":
                return "#" + this.data.red.toString(16).padStart(2, "0") + this.data.green.toString(16).padStart(2, "0") + this.data.blue.toString(16).padStart(2, "0");
        }
        return null;
    }
}
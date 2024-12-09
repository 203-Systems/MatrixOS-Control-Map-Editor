import type {Effect, ActionInfoType} from "../ActionRegistry";
import type {SvelteComponent} from 'svelte';

import ActionColorEffectBody from "./ActionColorEffectBody.svelte";
import {WatsonHealthSpineLabel} from "carbon-icons-svelte";
import type {ActionEffectData} from "./ActionColorEffectData";

export class ActionColorEffect implements Effect {
    static readonly identifier: string = "color";
    static readonly description: string = "Action Driven Color";
    static readonly icon: SvelteComponent = WatsonHealthSpineLabel;
    static readonly body: SvelteComponent = ActionColorEffectBody;

    data: ActionColorEffectData;

    constructor() {
        this.data = {
            enabled: [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            color: [[1, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
                    [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
                    [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
                    [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
        }
    }

    import(data: any[]): boolean {
        // try
        // {
        //     this.data.hasDefault = (data[0] & 0b1) > 0;
        //     this.data.hasActivated = (data[0] & 0b10) > 0;
        //     this.data.default = [((data[1] >> 16) & 0xFF) / 255, ((data[1] >> 8) & 0xFF) / 255, (data[1] & 0xFF) / 255];
        //     this.data.activated = [((data[2] >> 16) & 0xFF) / 255, ((data[2] >> 8) & 0xFF) / 255, (data[2] & 0xFF) / 255];
        //     return true
        // }
        // catch (error)
        // {
        //     console.error("ActionColorEffect: Import Failed");
        //     return false;
        // }
    }

    export(): any[] | undefined {
        // var data = []
        // data[0] = Number(this.data.hasDefault);
        // data[0] += Number(this.data.hasActivated) << 1;
        // data[1] = (Math.round(this.data.default[0] * 255) << 16) + (Math.round(this.data.default[1] * 255) << 8) + Math.round(this.data.default[2] * 255);
        // data[2] = (Math.round(this.data.activated[0] * 255) << 16) + (Math.round(this.data.activated[1] * 255) << 8) + Math.round(this.data.activated[2] * 255);
        // return data;
    }

    info(type: ActionInfoType): string | null{
        switch(type)
        {
            case "Color":
                if(this.data.enabled[0])
                {
                    return "#" + Math.round(this.data.color[0][0] * 255).toString(16).padStart(2, "0") + Math.round(this.data.color[0][1] * 255).toString(16).padStart(2, "0") + Math.round(this.data.color[0][2] * 255).toString(16).padStart(2, "0");
                }
        }
        return null;
    }
}
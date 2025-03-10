import type {Effect, ActionInfoType} from "../ActionRegistry";
import type {SvelteComponent} from 'svelte';

import ActionColorEffectBody from "./ActionColorEffectBody.svelte";
import {WatsonHealthSpineLabel} from "carbon-icons-svelte";
import type {ActionEffectData} from "./ActionColorEffectData";


export class ActionColorEffect implements Effect {
    static readonly identifier: string = "actioncolor";
    static readonly description: string = "actioncolor.description";
    static readonly icon: SvelteComponent = WatsonHealthSpineLabel;
    static readonly body: SvelteComponent = ActionColorEffectBody;

    data: ActionColorEffectData;

    static defaultData: ActionEffectData = {
        actionIdentifier: ActionColorEffect.identifier,
        enabled: [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        color: [[1, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
                [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
                [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
                [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
    }

    constructor() {
        this.data = structuredClone(ActionColorEffect.defaultData);
    }

    import(data: any[]): boolean {
        try
        {
            this.data.enabled = []
            for (let i = 0; i < 16; i++) {
                this.data.enabled[i] = (data[0] & (1 << i)) > 0;
            }
            var ptr = 1;
            for (let i = 0; i < 16; i++) {
                if (this.data.enabled[i]) {
                    this.data.color[i] = [(data[ptr] >> 16) & 0xFF, (data[ptr] >> 8) & 0xFF, data[ptr] & 0xFF].map(x => x / 255);
                    ptr++;
                }
            }
            return true;
        }
        catch (error)
        {
            throw new Error("ActionColorEffect: Import Failed");
            return false;
        }
    }

    export(): any[] | undefined {
        var data:number[] = []
        for (let i = 0; i < 16; i++) {
            data[0] = (data[0] | 0) + (Number(this.data.enabled[i]) << i);
        }
        for (let i = 0; i < 16; i++) {
            if (this.data.enabled[i]) {
                data.push((Math.round(this.data.color[i][0] * 255) << 16) + (Math.round(this.data.color[i][1] * 255) << 8) + Math.round(this.data.color[i][2] * 255));
            }
        }
        return data;
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
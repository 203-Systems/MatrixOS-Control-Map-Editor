import type { Action, ActionInfoType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import LayerActionBody from "./LayerActionBody.svelte";
import { Layers } from "carbon-icons-svelte";
import type { LayerActionData} from "./LayerActionData";
import {LayerActionMode, LayerActionType, LayerActionOption} from "./LayerActionData";

export class LayerAction implements Action {
    static readonly identifier: string = "layer";
    static readonly description: string = "layer.description";
    static readonly icon: SvelteComponent = Layers;
    static readonly body: SvelteComponent = LayerActionBody;

    data: LayerActionData;

    constructor() {
        this.data = {
            actionIdentifier: LayerAction.identifier,
            mode: Object.keys(LayerActionMode)[0],
            type: Object.keys(LayerActionType)[0],
            option: Object.keys(LayerActionOption)[0],
            relative: false,
            layer: 1
        }
    }

    import(data: any[]): boolean {
        try
        {   
            this.data.mode = Object.keys(LayerActionMode).find(key => LayerActionMode[key] === (data[0] & 0b1111));
            this.data.type = Object.keys(LayerActionType).find(key => LayerActionType[key] === ((data[0] >> 4) & 0b1111));
            this.data.option = Object.keys(LayerActionOption).find(key => LayerActionOption[key] === ((data[0] >> 8) & 0b1111));
            this.data.relative = (data[0] >> 15) > 0;
            this.data.layer = data[1];

            if(!this.data.relative) this.data.layer += 1; // In the UI data, it is 1-16, but in the export it is 0-15

            if(this.data.mode == undefined) return false;
            if(!this.data.relative && (this.data.layer < 1 || this.data.layer > 16)) return false;
            if(this.data.relative && (this.data.layer < -15 || this.data.layer > 15)) return false;
            return true; 
        }
        catch (error)
        {
            console.error("LayerAction: Import Failed");
            return false;
        }

    }

    export(): any[] | undefined {
        var data = []
        data[0] = LayerActionMode[this.data.mode];
        data[0] += LayerActionMode[this.data.type] << 4;
        data[0] += LayerActionMode[this.data.option] << 8;
        data[0] += this.data.relative ? (0b1 << 15) : 0;

        data[1] = this.data.layer;

        if(!this.data.relative) data[1] -= 1; // In the UI data, it is 1-16, but in the export it is 0-15

        return data;
    }

    info(type: ActionInfoType): string | null {
        switch(type)
        {
            case "Title":
                return "layer.previewTitle"
            case "Subtitle":
                if(this.data.relative)
                {
                    return this.data.layer > 0 ? `+${this.data.layer}` : this.data.layer.toString();
                }
                else
                {
                    return this.data.layer.toString();
                }
        }
        return null;
    }
}
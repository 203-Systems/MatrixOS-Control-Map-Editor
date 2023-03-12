import type { Action, InfoTextType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import WrapActionBody from "./WrapActionBody.svelte";
import { ZAxis } from "carbon-icons-svelte";
import type { WrapActionData} from "./WrapActionData";

export class WrapAction implements Action {
    static readonly type: string = "action";
    static readonly identifier: string = "wrap";
    static readonly description: string = "Wrap to Another Action Group";
    static readonly icon: SvelteComponent = ZAxis;
    static readonly body: SvelteComponent = WrapActionBody;

    data: WrapActionData;

    constructor() {
        this.data = {
            relativeLayer: false,
            layer: 1,
            relativePos: true,
            x: 0,
            y: 0,
        }
    }

    import(data: any[]): boolean {
        try
        {   
            this.data.relativeLayer = data[0] & 1;
            this.data.layer = data[1];
            this.data.relativePos = (data[0] >> 1) & 1;
            this.data.x = data[2];
            this.data.y = data[3];

            if(!this.data.relativeLayer) this.data.layer += 1; // In the UI data, it is 1-16, but in the export it is 0-15

            if(!this.data.relativeLayer && (this.data.layer < 1 || this.data.layer > 16)) return false;
            if(this.data.relativeLayer && (this.data.layer < -15 || this.data.layer > 15)) return false;
            return true; 
        }
        catch (error)
        {
            console.error("WrapAction: Import Failed");
            return false;
        }

    }

    export(): any[] | undefined {
        var data = []
        data[0] = 0;
        data[0] |= this.data.relativeLayer;
        data[0] |= this.data.relativePos << 1;
        data[1] = this.data.layer;
        data[2] = this.data.x;
        data[3] = this.data.y;

        if(!this.data.relativeLayer) data[1] -= 1; // In the UI data, it is 1-16, but in the export it is 0-15

        return data;
    }

    info(type: InfoTextType): string | null {
        switch(type)
        {
            case "Title":
                return "Wrap"
            case "Subtitle":
                if(this.data.relativeLayer)
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
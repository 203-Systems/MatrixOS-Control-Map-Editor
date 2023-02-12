import type { Action } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import MidiActionBody from "./MidiActionBody.svelte";
import { Music } from "carbon-icons-svelte";
import type { MidiActionData } from "./MidiActionData";

export class MidiAction implements Action {
    static readonly identifier: string = "midi";
    static readonly description: string = "Send a Midi Message";
    static readonly icon: SvelteComponent = Music;
    static readonly body: SvelteComponent = MidiActionBody;

    data: MidiActionData;

    constructor() {
        this.data = {
            type: "Note",
            data: {
                key: 60,
                velocity: true,
                channel: 0
            }
        }
    }

    import(data: any[]): boolean {
        try
        {
            switch(data[0] & 0b11110000)
            {
                case 0x90:
                    this.data.type = "Note";
                    this.data.data.key = data[1] & 0b01111111;
                    this.data.data.velocity = data[1] & 0b10000000;
                    this.data.data.channel = data[0] & 0b00001111;
                    return true;
                case 0xB0:
                    this.data.type = "CC";
                    this.data.data.control = data[1];
                    this.data.data.value = data[2];
                    this.data.data.channel = data[0] & 0b00001111;
                    return true;
                default:
                    console.error("MidiAction: Unknown Midi Type");
                    return false;
            }
        }
        catch (error)
        {
            console.error("MidiAction: Import Failed");
            return false;
        }

    }

    export(): any[] | undefined {
        var data = []
        if(this.data.type == "Note")
        {
            data[0] = 0x90;
            data[1] = this.data.data.key + this.data.data.velocity * 0b10000000; // If first bit is set, then velocity sensitivty is on.
            if (this.data.data.velocity) {
                data[2] = 127; // Custom Velocity, UI todo
            }
        }
        else if(this.data.type == "CC")
        {
            data[0] = 0xB0;
            data[1] = this.data.data.control;
            data[2] = this.data.data.value;
        }

        data[0] += this.data.data.channel;

        return data;
    }

    summary(): object {
        return {};
    }
}
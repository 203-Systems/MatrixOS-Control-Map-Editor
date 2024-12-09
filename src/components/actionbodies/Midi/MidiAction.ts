import type { Action, ActionInfoType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import MidiActionBody from "./MidiActionBody.svelte";
import { Music } from "carbon-icons-svelte";
import type { MidiActionData } from "./MidiActionData";
import {MidiType, MidiTypeMapShort, AnalogSource} from "./MidiActionData";

export class MidiAction implements Action {
    static readonly identifier: string = "midi";
    static readonly description: string = "Send a Midi Message";
    static readonly icon: SvelteComponent = Music;
    static readonly body: SvelteComponent = MidiActionBody;

    data: MidiActionData;

    constructor() {
        this.data = {
            type: MidiType.Note,
            data: {
                channel: 1,
                note: 60,
                source: AnalogSource.KeyForce,
                begin: 0,
                end: 127,
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
                    this.data.data.channel = (data[0] & 0b00001111) + 1;
                    this.data.data.note = data[1] & 0b01111111;
                    this.data.data.velocity = false;
                    return true;
                case 0xA0:
                    this.data.type = "Note"; // But with velocity 
                    this.data.data.channel = (data[0] & 0b00001111) + 1;
                    this.data.data.note = data[1] & 0b01111111;
                    this.data.data.velocity = true;
                    return true;
                case 0xB0:
                    this.data.type = "Control Change";
                    this.data.data.channel = (data[0] & 0b00001111) + 1;
                    this.data.data.control = data[1];
                    this.data.data.value = data[2];
                    return true;
                case 0xC0:
                    this.data.type = "Program Change";
                    this.data.data.channel = (data[0] & 0b00001111) + 1;
                    this.data.data.control = data[1];
                    this.data.data.value = data[2];
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
            if(!this.data.data.velocity)
            {
                data[0] = 0x90 + this.data.data.channel - 1;
                data[1] = this.data.data.note;
                data[2] = 127;
            }
            else
            {
                data[0] = 0xA0 + this.data.data.channel - 1; // AFter Touch
                data[1] = this.data.data.note;
            }
        }
        else if(this.data.type == "CC")
        {
            data[0] = 0xB0 + this.data.data.channel - 1;
            data[1] = this.data.data.control;
            data[2] = this.data.data.value;
        }

        data[0] += (this.data.data.channel - 1);

        return data;
    }

    info(type: ActionInfoType): string | null{
        switch(type)
        {
            case "Title":
                let title = MidiTypeMapShort.get(this.data.type);
                return title ? title : "???";
            case "Subtitle":
                switch (this.data.type)
                {
                    case MidiType.Note:
                        return this.data.data.note;
                    case MidiType.ControlChange:
                    case MidiType.ProgramChange:
                    case MidiType.NRPN:
                    case MidiType.RPN:
                        return this.data.data.control;
                    case MidiType.PitchBend:
                        return this.data.data.channel;
                    default:
                        return null;
                }

        }
        return null;
    }
}
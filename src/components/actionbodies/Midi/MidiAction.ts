import type { Action, ActionInfoType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import MidiActionBody from "./MidiActionBody.svelte";
import { Music } from "carbon-icons-svelte";
import type { MidiActionData } from "./MidiActionData";
import {MidiType, MidiTypeMapShort, AnalogSource} from "./MidiActionData";

export function SysexToByteArray(sysex: string): Uint8Array | Error {
    try{
        // Split the input string by spaces
        const parts = sysex.trim().split(/\s+/);

        // Convert each part to a number
        const byteArray = parts.map(part => {
            let value;
            // Check if the number is in hexadecimal format
            if (part.startsWith("0x") || part.startsWith("0X")) {
                value = parseInt(part, 16); // Parse as hexadecimal
            } else {
                value = parseInt(part, 10); // Parse as decimal
            }

            // Ensure the value is within the valid byte range
            if (value < 0 || value > 255 || isNaN(value)) {
                return new Error(`Invalid value in sysex string: "${part}"`);
            }

            return value;
        });

        // Convert the array of numbers to a Uint8Array
        return new Uint8Array(byteArray);
    } catch (error) {
        return error;
    }
}


export class MidiAction implements Action {
    static readonly identifier: string = "midi";
    static readonly description: string = "midi.description";
    static readonly icon: SvelteComponent = Music;
    static readonly body: SvelteComponent = MidiActionBody;

    data: MidiActionData;

    constructor() {
        this.data = {
            actionIdentifier: MidiAction.identifier,
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
            this.data.type = data[0];
            if(this.data.type == MidiType.Note)
            {
                this.data.data.channel = data[1];
                this.data.data.note = data[2];
                this.data.data.source = data[3];
                this.data.data.begin = data[4];
                this.data.data.end = data[5];
            }
            else if(this.data.type == MidiType.ControlChange || this.data.type == MidiType.RPN || this.data.type == MidiType.NRPN)
            {
                this.data.data.channel = data[1];
                this.data.data.control = data[2];
                this.data.data.source = data[3];
                this.data.data.begin = data[4];
                this.data.data.end = data[5];
            }
            else if(this.data.type == MidiType.ProgramChange)
            {
                this.data.data.channel = data[1];
                this.data.data.control = data[2];
            }
            else if(this.data.type == MidiType.PitchBend)
            {
                this.data.data.channel = data[1];
                this.data.data.source = data[2];
                this.data.data.begin = (data[3] - 1) / 16382 * 2 - 1;
                this.data.data.end = (data[4] - 1) / 16382 * 2 - 1;
            }
            else if(this.data.type == MidiType.Sysex)
            {   

                this.data.data.data = "";

                var byteArray: Uint8Array = data[1];

                for (let i = 0; i < byteArray.length; i++) {
                    this.data.data.data +=  "0x"+byteArray[i].toString(16).padStart(2, "0") + " ";
                }

                this.data.data.data = this.data.data.data.trim();
            }
            else if(this.data.type == MidiType.Start || this.data.type == MidiType.Continue || this.data.type == MidiType.Stop || this.data.type == MidiType.Reset)
            {
                // Do nothing
            }
            else
            {
                console.error("MidiAction: Unknown Midi Type");
                return false;
            }
            return true;
        }
        catch (error)
        {
            console.error("MidiAction: Import Failed");
            return false;
        }

    }

    export(): any[] | undefined {
        var data = []
        data.push(this.data.type);
        if(this.data.type == MidiType.Note)
        {
            data.push(this.data.data.channel);
            data.push(this.data.data.note);
            data.push(this.data.data.source);
            data.push(this.data.data.begin);
            data.push(this.data.data.end);
        }
        else if(this.data.type == MidiType.ControlChange || this.data.type == MidiType.RPN || this.data.type == MidiType.NRPN)
        {
            data.push(this.data.data.channel);
            data.push(this.data.data.control);
            data.push(this.data.data.source);
            data.push(this.data.data.begin);
            data.push(this.data.data.end);
        }
        else if(this.data.type == MidiType.ProgramChange)
        {
            data.push(this.data.data.channel);
            data.push(this.data.data.control);
        }
        else if(this.data.type == MidiType.PitchBend)
        {
            data.push(this.data.data.channel);
            data.push(this.data.data.source);
            data.push(Math.round((this.data.data.begin + 1) * 16382 / 2) + 1);
            data.push(Math.round((this.data.data.end + 1) * 16382 / 2) + 1);
        }
        else if(this.data.type == MidiType.Sysex)
        {

            data.push(SysexToByteArray(this.data.data.data));
        }
        else if(this.data.type == MidiType.Start || this.data.type == MidiType.Continue || this.data.type == MidiType.Stop || this.data.type == MidiType.Reset)
        {

        }
        else
        {
            console.error("MidiAction: Unknown Midi Type");
            return undefined;
        }

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
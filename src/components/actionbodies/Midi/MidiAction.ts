import type { Action, ActionInfoType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import MidiActionBody from "./MidiActionBody.svelte";
import { Music } from "carbon-icons-svelte";
import type { MidiActionData } from "./MidiActionData";
import {MidiType, MidiTypeMapShort, AnalogSource} from "./MidiActionData";

export function SysexToByteArray(sysex?: string | null): Uint8Array | Error {
    try {
      if (sysex === undefined || sysex === null) {
        return new Error("Sysex data is empty");
      }

      const trimmedSysex = sysex.trim();
      if (trimmedSysex.length === 0) {
        return new Error("Sysex data is empty");
      }

      // Split the input string by whitespace.
      const parts = trimmedSysex.split(/\s+/);

      // Filter out all the empty strings.
      const filteredParts = parts.filter((part) => part !== "");
  
      const byteArray = filteredParts.map((part) => {
        let value: number;
  
        // Hexadecimal token: starts with "0x" (or "0X")
        if (part.startsWith("0x") || part.startsWith("0X")) {
          value = parseInt(part, 16);
        }
        // Macro token: must be in the format <val*> where * is an optional number.
        else if (part.startsWith("<") && part.endsWith(">")) {
          const macroMatch = part.match(/^<val(\d*)>$/);
          if (macroMatch) {
            // If no number is provided after "val", default to 0.
            const numStr = macroMatch[1];
            const macroNum = numStr === "" ? 0 : (parseInt(numStr, 10) - 1);
            // Ensure the macro number is within the allowed range (0 to 16).
            if (macroNum < 0 || macroNum > 15) {
              return new Error(`Invalid macro number in sysex string: "${part}"`);
            }
            value = 0x180 + macroNum;
          } else {
            return new Error(`Invalid macro format: "${part}"`);
          }
        }
        // Decimal token: pure number.
        else if (!isNaN(Number(part))) {
          value = parseInt(part, 10);
        } 
        else {
          return new Error(`Invalid token in sysex string: "${part}"`);
        }
  
        return value;
      });
  
      // Check if any token processing resulted in an Error.
      for (const element of byteArray) {
        if (element instanceof Error) {
          return element;
        }
      }

      if(byteArray.length < 2)
      {
        return new Error("Sysex need to have at least 2 bytes (0xF0 and 0xF7)");
      }

      if(byteArray[0] != 0xF0)
      {
        return new Error("Sysex need to start with 0xF0");
      }

      if(byteArray[byteArray.length - 1] != 0xF7)
      {
        return new Error("Sysex need to end with 0xF7");
      }

      for (let i = 1; i < byteArray.length - 1; i++) {
          // Ensure the value is within the valid byte range.
          if (byteArray[i] >= 0x180 && byteArray[i] <= 0x18F)
          {
            // Macro value, scale back
            byteArray[i] = byteArray[i] - 0x180;
          }
          else if (isNaN(byteArray[i]) || byteArray[i] < 0x00 || byteArray[i] > 0x7f) 
          {
            return new Error(`Out of range value in sysex string: "${filteredParts[i]}" `);
          }
      }

  
      return new Uint8Array(byteArray as number[]);
    } catch (error) {
      console.error(error);
      return error instanceof Error ? error : new Error("Failed to parse sysex data");
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

                this.data.data.sysex = "";

                var byteArray: Uint8Array = data[1];

                for (let i = 0; i < byteArray.length; i++) {
                    if(byteArray[i] >= 0x80 && byteArray[i] <= 0x8F)
                    {
                      this.data.data.sysex += "<val"+(byteArray[i]-0x80+1)+"> ";
                    }
                    else
                    {
                      this.data.data.sysex +=  "0x"+byteArray[i].toString(16).padStart(2, "0") + " ";
                    }
                }

                this.data.data.sysex = this.data.data.sysex.trim();
            }
            else if(this.data.type == MidiType.Start || this.data.type == MidiType.Continue || this.data.type == MidiType.Stop || this.data.type == MidiType.Reset)
            {
                // Do nothing
            }
            else
            {
                throw new Error("MidiAction: Unknown Midi Type");
                return false;
            }
            return true;
        }
        catch (error)
        {
            throw new Error("MidiAction: Import Failed");
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
            var sysexParseResult = SysexToByteArray(this.data.data.sysex);
            if(sysexParseResult instanceof Error)
            {
                throw new Error("MidiAction: Export Failed - Sysex Error: " + sysexParseResult.message);
                return undefined;
            }
            else if(sysexParseResult instanceof Uint8Array)
            {
                data.push(sysexParseResult);
            }
        }
        else if(this.data.type == MidiType.Start || this.data.type == MidiType.Continue || this.data.type == MidiType.Stop || this.data.type == MidiType.Reset)
        {

        }
        else
        {
            throw new Error("MidiAction: Unknown Midi Type");
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

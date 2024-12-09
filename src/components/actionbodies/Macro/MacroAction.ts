import type { Action, ActionInfoType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import MacroActionBody from "./MacroActionBody.svelte";
import { Script } from "carbon-icons-svelte";
import type { MacroActionBody } from "./MacroActionData";

export class MacroAction implements Action {
    static readonly identifier: string = "macro";
    static readonly description: string = "Run a Macro Script";
    static readonly icon: SvelteComponent = Script;
    static readonly body: SvelteComponent = MacroActionBody;

    data: MacroActionBody;

    constructor() {
        this.data = {
            script: ""
        }
    }

    import(data: any[]): boolean {
        try
        {
            this.data.script = data[0];
            return true;
        }
        catch (error)
        {
            console.error("MacroAction: Import Failed");
            return false;
        }

    }

    export(): any[] | undefined {
        var data = []

        data[0] = this.data.script;

        return data;
    }

    info(type: ActionInfoType): string | null{
        switch(type)
        {
            case "Title":
                return "Macro"
            case "Subtitle":
                return null
        }
        return null;
    }
}
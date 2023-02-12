import type { Action } from "/src/components/actionbodies/ActionRegistry";

// Place Holder for the Effect Data
export type Effect = {
    type: string,
    data:any[]
}

export type KeyConfig = {
    actions:Action[],
    effects:Effect[]
}

export { Action as Action };
// export { Effect as Effect };
import type { Action, Effect } from "/src/components/actionbodies/ActionRegistry";


export type KeyAction = {
    actions:Action[],
    effects:Effect[]
}

export { Action as Action };
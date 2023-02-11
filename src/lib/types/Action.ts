import type { CarbonIcon } from "carbon-icons-svelte";

export type ActionMeta = {
    actionName: string,
    actionIdentifier: string,
    carbonIcon: CarbonIcon
}

export type Action = {
    type: string,
    data:any[]
}

export type Effect = {
    type: string,
    data:any[]
}

export type KeyConfig = {
    actions:Action[],
    effects:Effect[]
}
 
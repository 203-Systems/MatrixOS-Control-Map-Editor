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
 
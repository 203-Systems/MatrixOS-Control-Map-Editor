export const LayerActionMode : {[mode: string]: number}= { //Up to 16 Mode
    "Persistance": 0, 
    "Momentariy" : 1,
}

export const LayerActionType : {[mode: string]: number}= { //Up to 16 Type
    "Active": 0, 
    "Pass Though" : 1,
}

export const LayerActionOption : {[mode: string]: number}= { //Up to 16 options
    "Toggle": 0,
    "Enable": 1,
    "Disable": 2,
}

export type LayerActionData = {
    mode: string,
    type: string,
    option: string,
    relative: boolean,
    layer: number,
}
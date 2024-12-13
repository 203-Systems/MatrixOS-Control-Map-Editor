export const LayerActionMode: { [mode: string]: number } = { // Up to 16 Mode
    'layer.mode.persistence': 0, 
    'layer.mode.momentary': 1,
};

export const LayerActionType: { [type: string]: number } = { // Up to 16 Type
    'layer.type.active': 0, 
    'layer.type.pass_through': 1,
};

export const LayerActionOption: { [option: string]: number } = { // Up to 16 Options
    'layer.option.toggle': 0,
    'layer.option.enable': 1,
    'layer.option.disable': 2,
};

export type LayerActionData = {
    mode: string,
    type: string,
    option: string,
    relative: boolean,
    layer: number,
}
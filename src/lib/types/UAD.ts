// UniversalActionDesciptor

export type UniversalActionDesciptor = {
    uad_version: number,
    action_list: string[],
    effect_list: string[],
    devices: UniversalActionDesciptorDevice[]
}

export type UniversalActionDesciptorDevice = {
    name: string,
    id: [number, number], // [vendor, product]
    size: [number, number],
    layers: number,
    effects: any[][][][][], // [layer][x][y][effects][effect data]
    actions: any[][][][][], // [x][y][layer][action][action data] 
    // Null note: The way layer is on the third element is to improve look up speed for layer pass though
}
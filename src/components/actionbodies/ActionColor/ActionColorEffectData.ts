export type ActionColorEffectData = {
    actionIdentifier: string,
    enabled: boolean[];
    color: [number, number, number][];
    // This is dumb but it works
}
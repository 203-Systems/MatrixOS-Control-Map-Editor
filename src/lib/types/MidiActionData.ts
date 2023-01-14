export type MidiActionData = {
    type: "NOTE" | "CC",
    key: number,
    velocity: number
    channel: number
}
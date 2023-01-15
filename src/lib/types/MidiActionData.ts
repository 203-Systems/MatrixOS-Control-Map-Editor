export type MidiActionData = {
    type: "Note" | "CC",
    key: number,
    velocity: number
    channel: number
}
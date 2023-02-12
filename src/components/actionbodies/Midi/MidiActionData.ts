export type MidiNoteData = {
    key: number,
    velocity: boolean
    channel: number
}

export type MidiCCData = {
    control: number,
    value: number
    channel: number
}

export type MidiActionData = {
    type: "Note" | "CC",
    data: MidiNoteData | MidiCCData
}
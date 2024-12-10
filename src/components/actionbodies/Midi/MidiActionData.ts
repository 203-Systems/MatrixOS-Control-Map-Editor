export enum MidiType {
    Note = 0x90,
    ControlChange = 0xB0,
    ProgramChange = 0xC0,
    ChannelPressure = 0xD0,
    PitchBend = 0xE0,
    Sysex = 0xF0,
    // Out of MIDI Spec, but I think for our case it's fine
    RPN = 0xF4,
    NRPN = 0xF5,
    Start = 0xFA,
    Continue = 0xFB,
    Stop = 0xFC,
    Reset = 0xFF,
}

export const MidiTypeMap = new Map([
    [MidiType.Note, "Note"],
    [MidiType.ControlChange, "Control Change"],
    [MidiType.ProgramChange, "Program Change"],
    [MidiType.ChannelPressure, "Channel Pressure"],
    [MidiType.PitchBend, "Pitch Bend"],
    [MidiType.Sysex, "SysEx"],
    [MidiType.RPN, "RPN"],
    [MidiType.NRPN, "NRPN"],
    [MidiType.Start, "Start"],
    [MidiType.Continue, "Continue"],
    [MidiType.Stop, "Stop"],
    [MidiType.Reset, "Reset"],
]);

export const MidiTypeMapShort = new Map([
    [MidiType.Note, "Note"],
    [MidiType.ControlChange, "CC"],
    [MidiType.ProgramChange, "PC"],
    [MidiType.ChannelPressure, "CP"],
    [MidiType.PitchBend, "Pitch"],
    [MidiType.Sysex, "SysEx"],
    [MidiType.RPN, "RPN"],
    [MidiType.NRPN, "NRPN"],
    [MidiType.Start, "Start"],
    [MidiType.Continue, "Cont"],
    [MidiType.Stop, "Stop"],
    [MidiType.Reset, "Reset"],
]);

export enum AnalogSource {
    Momentary = 0,
    Persistent = 1,
    Toggle = 2,
    KeyForce = 3,
}

export const AnalogSourceMap = new Map([
    [AnalogSource.Momentary, "Momentary"],
    [AnalogSource.Persistent, "Persistent"],
    [AnalogSource.Toggle, "Toggle"],
    [AnalogSource.KeyForce, "Key Force"],
]);

 

export type MidiActionData = {
    type: MidiType,
    data: MidiNoteData | MidiCCData | MidiPCData | MidiCPData | MidiPitchbendData | MidiRPNData | MidiNRPNData | MidiSysexData | null
}
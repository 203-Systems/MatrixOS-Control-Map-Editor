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
    [MidiType.Note,'midi.type.note'],
    [MidiType.ControlChange,'midi.type.control_change'],
    [MidiType.ProgramChange,'midi.type.program_change'],
    [MidiType.ChannelPressure,'midi.type.channel_pressure'],
    [MidiType.PitchBend,'midi.type.pitch_bend'],
    [MidiType.Sysex,'midi.type.sysex'],
    [MidiType.RPN,'midi.type.rpn'],
    [MidiType.NRPN,'midi.type.nrpn'],
    [MidiType.Start,'midi.type.start'],
    [MidiType.Continue,'midi.type.continue'],
    [MidiType.Stop,'midi.type.stop'],
    [MidiType.Reset,'midi.type.reset'],
]);

export const MidiTypeMapShort = new Map([
    [MidiType.Note,'midi.short.note'],
    [MidiType.ControlChange,'midi.short.cc'],
    [MidiType.ProgramChange,'midi.short.pc'],
    [MidiType.ChannelPressure,'midi.short.cp'],
    [MidiType.PitchBend,'midi.short.pitch'],
    [MidiType.Sysex,'midi.short.sysex'],
    [MidiType.RPN,'midi.short.rpn'],
    [MidiType.NRPN,'midi.short.nrpn'],
    [MidiType.Start,'midi.short.start'],
    [MidiType.Continue,'midi.short.cont'],
    [MidiType.Stop,'midi.short.stop'],
    [MidiType.Reset,'midi.short.reset'],
]);

export enum AnalogSource {
    Momentary = 0,
    Persistent = 1,
    Toggle = 2,
    KeyForce = 3,
}

export const AnalogSourceMap = new Map([
    [AnalogSource.Momentary,'midi.analog.momentary'],
    [AnalogSource.Persistent,'midi.analog.persistent'],
    [AnalogSource.Toggle,'midi.analog.toggle'],
    [AnalogSource.KeyForce,'midi.analog.key_force'],
]);

export type MidiActionData = {
    type: MidiType,
    data: {} | null,
}
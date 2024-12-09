export enum GamepadKeycode {
    GAMEPAD_A = 0x00,
    GAMEPAD_B = 0x01,
    GAMEPAD_C = 0x02,
    GAMEPAD_X = 0x03,
    GAMEPAD_Y = 0x04,
    GAMEPAD_Z = 0x05,
    GAMEPAD_L1 = 0x06,
    GAMEPAD_R1 = 0x07,
    GAMEPAD_L2 = 0x08,
    GAMEPAD_R2 = 0x09,
    GAMEPAD_SELECT = 0x0A,
    GAMEPAD_START = 0x0B,
    GAMEPAD_MODE = 0x0C,
    GAMEPAD_L3 = 0x0D,
    GAMEPAD_R3 = 0x0E,
  
    GAMEPAD_1 = 0x80,
    GAMEPAD_2 = 0x81,
    GAMEPAD_3 = 0x82,
    GAMEPAD_4 = 0x83,
    GAMEPAD_5 = 0x84,
    GAMEPAD_6 = 0x85,
    GAMEPAD_7 = 0x86,
    GAMEPAD_8 = 0x87,
    GAMEPAD_9 = 0x88,
    GAMEPAD_10 = 0x89,
    GAMEPAD_11 = 0x8A,
    GAMEPAD_12 = 0x8B,
    GAMEPAD_13 = 0x8C,
    GAMEPAD_14 = 0x8D,
    GAMEPAD_15 = 0x8E,
    GAMEPAD_16 = 0x8F,
    GAMEPAD_17 = 0x90,
    GAMEPAD_18 = 0x91,
    GAMEPAD_19 = 0x92,
    GAMEPAD_20 = 0x93,
    GAMEPAD_21 = 0x94,
    GAMEPAD_22 = 0x95,
    GAMEPAD_23 = 0x96,
    GAMEPAD_24 = 0x97,
    GAMEPAD_25 = 0x98,
    GAMEPAD_26 = 0x99,
    GAMEPAD_27 = 0x9A,
    GAMEPAD_28 = 0x9B,
    GAMEPAD_29 = 0x9C,
    GAMEPAD_30 = 0x9D,
    GAMEPAD_31 = 0x9E,
    GAMEPAD_32 = 0x9F,

    GAMEPAD_DPAD = 0x40,
    GAMEPAD_LEFT_STICK_X_AXIS = 0x41,
    GAMEPAD_LEFT_STICK_Y_AXIS = 0x42,
    GAMEPAD_RIGHT_STICK_X_AXIS = 0x43,
    GAMEPAD_RIGHT_STICK_Y_AXIS = 0x44,
    GAMEPAD_LEFT_TRIGGER_AXIS = 0x45,
    GAMEPAD_RIGHT_TRIGGER_AXIS = 0x46,
  };

  export const GamepadKeycodeFriendlyName: {[key in GamepadKeycode]: string} = {
    [GamepadKeycode.GAMEPAD_A]: "A",
    [GamepadKeycode.GAMEPAD_B]: "B",
    [GamepadKeycode.GAMEPAD_C]: "C",
    [GamepadKeycode.GAMEPAD_X]: "X",
    [GamepadKeycode.GAMEPAD_Y]: "Y",
    [GamepadKeycode.GAMEPAD_Z]: "Z",
    [GamepadKeycode.GAMEPAD_L1]: "L1",
    [GamepadKeycode.GAMEPAD_R1]: "R1",
    [GamepadKeycode.GAMEPAD_L2]: "L2",
    [GamepadKeycode.GAMEPAD_R2]: "R2",
    [GamepadKeycode.GAMEPAD_L3]: "L3",
    [GamepadKeycode.GAMEPAD_R3]: "R3",

    [GamepadKeycode.GAMEPAD_SELECT]: "Select",
    [GamepadKeycode.GAMEPAD_START]: "Start",
    [GamepadKeycode.GAMEPAD_MODE]: "Mode",

    [GamepadKeycode.GAMEPAD_DPAD]: "D-Pad",

    [GamepadKeycode.GAMEPAD_LEFT_STICK_X_AXIS]: "LS-X",
    [GamepadKeycode.GAMEPAD_LEFT_STICK_Y_AXIS]: "LS-Y",
    [GamepadKeycode.GAMEPAD_RIGHT_STICK_X_AXIS]: "RS-X",
    [GamepadKeycode.GAMEPAD_RIGHT_STICK_Y_AXIS]: "RS-Y",
    [GamepadKeycode.GAMEPAD_LEFT_TRIGGER_AXIS]: "LT",
    [GamepadKeycode.GAMEPAD_RIGHT_TRIGGER_AXIS]: "RT",

    [GamepadKeycode.GAMEPAD_1]: "1",
    [GamepadKeycode.GAMEPAD_2]: "2",
    [GamepadKeycode.GAMEPAD_3]: "3",
    [GamepadKeycode.GAMEPAD_4]: "4",
    [GamepadKeycode.GAMEPAD_5]: "5",
    [GamepadKeycode.GAMEPAD_6]: "6",
    [GamepadKeycode.GAMEPAD_7]: "7",
    [GamepadKeycode.GAMEPAD_8]: "8",
    [GamepadKeycode.GAMEPAD_9]: "9",
    [GamepadKeycode.GAMEPAD_10]: "10",
    [GamepadKeycode.GAMEPAD_11]: "11",
    [GamepadKeycode.GAMEPAD_12]: "12",
    [GamepadKeycode.GAMEPAD_13]: "13",
    [GamepadKeycode.GAMEPAD_14]: "14",
    [GamepadKeycode.GAMEPAD_15]: "15",
    [GamepadKeycode.GAMEPAD_16]: "16",
    [GamepadKeycode.GAMEPAD_17]: "17",
    [GamepadKeycode.GAMEPAD_18]: "18",
    [GamepadKeycode.GAMEPAD_19]: "19",
    [GamepadKeycode.GAMEPAD_20]: "20",
    [GamepadKeycode.GAMEPAD_21]: "21",
    [GamepadKeycode.GAMEPAD_22]: "22",
    [GamepadKeycode.GAMEPAD_23]: "23",
    [GamepadKeycode.GAMEPAD_24]: "24",
    [GamepadKeycode.GAMEPAD_25]: "25",
    [GamepadKeycode.GAMEPAD_26]: "26",
    [GamepadKeycode.GAMEPAD_27]: "27",
    [GamepadKeycode.GAMEPAD_28]: "28",
    [GamepadKeycode.GAMEPAD_29]: "29",
    [GamepadKeycode.GAMEPAD_30]: "30",
    [GamepadKeycode.GAMEPAD_31]: "31",
    [GamepadKeycode.GAMEPAD_32]: "32",
};



export enum GamepadDpadDirection {
  GAMEPAD_DPAD_CENTERED = 0,
  GAMEPAD_DPAD_UP = 1,
  GAMEPAD_DPAD_UP_RIGHT = 2,
  GAMEPAD_DPAD_RIGHT = 3,
  GAMEPAD_DPAD_DOWN_RIGHT = 4,
  GAMEPAD_DPAD_DOWN = 5,
  GAMEPAD_DPAD_DOWN_LEFT = 6,
  GAMEPAD_DPAD_LEFT = 7,
  GAMEPAD_DPAD_UP_LEFT = 8
}

export const GamepadDpadDirectionFriendlyName: {[key in GamepadDpadDirection]: string} = {
  [GamepadDpadDirection.GAMEPAD_DPAD_CENTERED]: "Centered",
  [GamepadDpadDirection.GAMEPAD_DPAD_UP]: "Up",
  [GamepadDpadDirection.GAMEPAD_DPAD_UP_RIGHT]: "Up right",
  [GamepadDpadDirection.GAMEPAD_DPAD_RIGHT]: "Right",
  [GamepadDpadDirection.GAMEPAD_DPAD_DOWN_RIGHT]: "Down right",
  [GamepadDpadDirection.GAMEPAD_DPAD_DOWN]: "Down",
  [GamepadDpadDirection.GAMEPAD_DPAD_DOWN_LEFT]: "Down left",
  [GamepadDpadDirection.GAMEPAD_DPAD_LEFT]: "Left",
  [GamepadDpadDirection.GAMEPAD_DPAD_UP_LEFT]: "Up left"
}

export enum AnalogSource {
  Binary = 0,
  KeyForce = 1,
}

export const AnalogSourceFriendlyName = new Map([
  [AnalogSource.Binary, "Binary"],
  [AnalogSource.KeyForce, "Key Force"],
]);


export type GamepadKeycode = {
    key: GamepadKeycode|undefined
    analog: AnalogSource | undefined
    begin: number | undefined
    end: number | undefined
    dpad: GamepadDpadDirection | undefined
}
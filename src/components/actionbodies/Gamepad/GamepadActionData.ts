export enum GamepadKeycode {
    GAMEPAD_1 = 0x00,
    GAMEPAD_2 = 0x01,
    GAMEPAD_3 = 0x02,
    GAMEPAD_4 = 0x03,
    GAMEPAD_5 = 0x04,
    GAMEPAD_6 = 0x05,
    GAMEPAD_7 = 0x06,
    GAMEPAD_8 = 0x07,
    GAMEPAD_9 = 0x08,
    GAMEPAD_10 = 0x09,
    GAMEPAD_11 = 0x0A,
    GAMEPAD_12 = 0x0B,
    GAMEPAD_13 = 0x0C,
    GAMEPAD_14 = 0x0D,
    GAMEPAD_15 = 0x0E,
    GAMEPAD_16 = 0x0F,
    GAMEPAD_17 = 0x10,
    GAMEPAD_18 = 0x11,
    GAMEPAD_19 = 0x12,
    GAMEPAD_20 = 0x13,
    GAMEPAD_21 = 0x14,
    GAMEPAD_22 = 0x15,
    GAMEPAD_23 = 0x16,
    GAMEPAD_24 = 0x17,
    GAMEPAD_25 = 0x18,
    GAMEPAD_26 = 0x19,
    GAMEPAD_27 = 0x1A,
    GAMEPAD_28 = 0x1B,
    GAMEPAD_29 = 0x1C,
    GAMEPAD_30 = 0x1D,
    GAMEPAD_31 = 0x1E,
    GAMEPAD_32 = 0x1F,

    GAMEPAD_DPAD = 0x40,

    GAMEPAD_X_AXIS = 0x61,
    GAMEPAD_Y_AXIS = 0x62,
    GAMEPAD_Z_AXIS = 0x63,
    GAMEPAD_RX_AXIS = 0x64,
    GAMEPAD_RY_AXIS = 0x65,
    GAMEPAD_RZ_AXIS = 0x66,
  };

  export const GamepadKeycodeFriendlyName: {[key in GamepadKeycode]: string} = {
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

    [GamepadKeycode.GAMEPAD_DPAD]: "gamepad.key.dpad",

    [GamepadKeycode.GAMEPAD_X_AXIS]: "gamepad.key.x_axis",
    [GamepadKeycode.GAMEPAD_Y_AXIS]: "gamepad.key.y_axis",
    [GamepadKeycode.GAMEPAD_Z_AXIS]: "gamepad.key.z_axis",
    [GamepadKeycode.GAMEPAD_RX_AXIS]: "gamepad.key.rx_axis",
    [GamepadKeycode.GAMEPAD_RY_AXIS]: "gamepad.key.ry_axis",
    [GamepadKeycode.GAMEPAD_RZ_AXIS]: "gamepad.key.rz_axis"
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
  [GamepadDpadDirection.GAMEPAD_DPAD_CENTERED]: "gamepad.dpad.centered",
  [GamepadDpadDirection.GAMEPAD_DPAD_UP]: "gamepad.dpad.up",
  [GamepadDpadDirection.GAMEPAD_DPAD_UP_RIGHT]: "gamepad.dpad.up_right",
  [GamepadDpadDirection.GAMEPAD_DPAD_RIGHT]: "gamepad.dpad.right",
  [GamepadDpadDirection.GAMEPAD_DPAD_DOWN_RIGHT]: "gamepad.dpad.down_right",
  [GamepadDpadDirection.GAMEPAD_DPAD_DOWN]: "gamepad.dpad.down",
  [GamepadDpadDirection.GAMEPAD_DPAD_DOWN_LEFT]: "gamepad.dpad.down_left",
  [GamepadDpadDirection.GAMEPAD_DPAD_LEFT]: "gamepad.dpad.left",
  [GamepadDpadDirection.GAMEPAD_DPAD_UP_LEFT]: "gamepad.dpad.up_left",
}

export enum AnalogSource {
  Binary = 0,
  KeyForce = 1,
}

export const AnalogSourceFriendlyName = new Map([
  [AnalogSource.Binary, "gamepad.analog.binary"],
  [AnalogSource.KeyForce, "gamepad.analog.key_force"]
]);


export type GamepadKeycode = {
    key: GamepadKeycode|undefined
    analog: AnalogSource | undefined
    begin: number | undefined
    end: number | undefined
    dpad: GamepadDpadDirection | undefined
}
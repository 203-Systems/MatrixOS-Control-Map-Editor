export enum KeyboardScanCode {
    KEY_USER_DEFINED    =  0,
    KEY_A               =  4,
    KEY_B               =  5,
    KEY_C               =  6,
    KEY_D               =  7,
    KEY_E               =  8,
    KEY_F               =  9,
    KEY_G               = 10,
    KEY_H               = 11,
    KEY_I               = 12,
    KEY_J               = 13,
    KEY_K               = 14,
    KEY_L               = 15,
    KEY_M               = 16,
    KEY_N               = 17,
    KEY_O               = 18,
    KEY_P               = 19,
    KEY_Q               = 20,
    KEY_R               = 21,
    KEY_S               = 22,
    KEY_T               = 23,
    KEY_U               = 24,
    KEY_V               = 25,
    KEY_W               = 26,
    KEY_X               = 27,
    KEY_Y               = 28,
    KEY_Z               = 29,
    KEY_1               = 30,
    KEY_2               = 31,
    KEY_3               = 32,
    KEY_4               = 33,
    KEY_5               = 34,
    KEY_6               = 35,
    KEY_7               = 36,
    KEY_8               = 37,
    KEY_9               = 38,
    KEY_0               = 39,
    KEY_ENTER           = 40,
    KEY_RETURN          = 40, // Alias
    KEY_ESC             = 41,
    KEY_BACKSPACE       = 42,
    KEY_TAB             = 43,
    KEY_SPACE           = 44,
    KEY_MINUS           = 45,
    KEY_EQUAL           = 46,
    KEY_LEFT_BRACE      = 47,
    KEY_RIGHT_BRACE     = 48,
    KEY_BACKSLASH       = 49,
    KEY_NON_US_NUM      = 50,
    KEY_SEMICOLON       = 51,
    KEY_QUOTE           = 52,
    KEY_TILDE           = 53,
    KEY_COMMA           = 54,
    KEY_PERIOD          = 55,
    KEY_SLASH           = 56,
    KEY_CAPS_LOCK       = 0x39,
    KEY_F1              = 0x3A,
    KEY_F2              = 0x3B,
    KEY_F3              = 0x3C,
    KEY_F4              = 0x3D,
    KEY_F5              = 0x3E,
    KEY_F6              = 0x3F,
    KEY_F7              = 0x40,
    KEY_F8              = 0x41,
    KEY_F9              = 0x42,
    KEY_F10             = 0x43,
    KEY_F11             = 0x44,
    KEY_F12             = 0x45,
    KEY_PRINT           = 0x46,
    KEY_PRINTSCREEN     = 0x46, // Alias
    KEY_SCROLL_LOCK     = 0x47,
    KEY_PAUSE           = 0x48,
    KEY_INSERT          = 0x49,
    KEY_HOME            = 0x4A,
    KEY_PAGE_UP         = 0x4B,
    KEY_DELETE          = 0x4C,
    KEY_END             = 0x4D,
    KEY_PAGE_DOWN       = 0x4E,
    KEY_RIGHT_ARROW     = 0x4F,
    KEY_LEFT_ARROW      = 0x50,
    KEY_DOWN_ARROW      = 0x51,
    KEY_UP_ARROW        = 0x52,
    KEY_RIGHT           = 0x4F, // Alias
    KEY_LEFT            = 0x50, // Alias
    KEY_DOWN            = 0x51, // Alias
    KEY_UP              = 0x52, // Alias
    KEY_NUM_LOCK        = 0x53,
    KEYPAD_DIVIDE       = 0x54,
    KEYPAD_MULTIPLY     = 0x55,
    KEYPAD_SUBTRACT     = 0x56,
    KEYPAD_ADD          = 0x57,
    KEYPAD_ENTER        = 0x58,
    KEYPAD_1            = 0x59,
    KEYPAD_2            = 0x5A,
    KEYPAD_3            = 0x5B,
    KEYPAD_4            = 0x5C,
    KEYPAD_5            = 0x5D,
    KEYPAD_6            = 0x5E,
    KEYPAD_7            = 0x5F,
    KEYPAD_8            = 0x60,
    KEYPAD_9            = 0x61,
    KEYPAD_0            = 0x62,
    KEYPAD_DOT          = 0x63,
    KEY_NON_US          = 0x64,
    KEY_APPLICATION     = 0x65, // Context menu/right click
    KEY_MENU            = 0x65, // Alias


    KEY_LEFT_CTRL           = 0xE0,
    KEY_LEFT_SHIFT          = 0xE1,
    KEY_LEFT_ALT            = 0xE2,
    KEY_LEFT_GUI            = 0xE3,
    KEY_LEFT_WINDOWS        = 0xE3, // Alias
    KEY_RIGHT_CTRL          = 0xE4,
    KEY_RIGHT_SHIFT         = 0xE5,
    KEY_RIGHT_ALT           = 0xE6,
    KEY_RIGHT_GUI           = 0xE7,
    KEY_RIGHT_WINDOWS       = 0xE7, // Alias
};

export const KeyboardScanCodeFriendlyName: {[key in KeyboardScanCode]: string}= {
    [KeyboardScanCode.KEY_USER_DEFINED]: "keyboard.code.user",
    [KeyboardScanCode.KEY_ERROR_ROLLOVER]: "ROLLOVER ERROR",
    [KeyboardScanCode.KEY_POST_FAIL]: "POST FAIL",
    [KeyboardScanCode.KEY_ERROR_UNDEFINED]: "UNDEFINED ERROR",
    [KeyboardScanCode.KEY_A]: "A",
    [KeyboardScanCode.KEY_B]: "B",
    [KeyboardScanCode.KEY_C]: "C",
    [KeyboardScanCode.KEY_D]: "D",
    [KeyboardScanCode.KEY_E]: "E",
    [KeyboardScanCode.KEY_F]: "F",
    [KeyboardScanCode.KEY_G]: "G",
    [KeyboardScanCode.KEY_H]: "H",
    [KeyboardScanCode.KEY_I]: "I",
    [KeyboardScanCode.KEY_J]: "J",
    [KeyboardScanCode.KEY_K]: "K",
    [KeyboardScanCode.KEY_L]: "L",
    [KeyboardScanCode.KEY_M]: "M",
    [KeyboardScanCode.KEY_N]: "N",
    [KeyboardScanCode.KEY_O]: "O",
    [KeyboardScanCode.KEY_P]: "P",
    [KeyboardScanCode.KEY_Q]: "Q",
    [KeyboardScanCode.KEY_R]: "R",
    [KeyboardScanCode.KEY_S]: "S",
    [KeyboardScanCode.KEY_T]: "T",
    [KeyboardScanCode.KEY_U]: "U",
    [KeyboardScanCode.KEY_V]: "V",
    [KeyboardScanCode.KEY_W]: "W",
    [KeyboardScanCode.KEY_X]: "X",
    [KeyboardScanCode.KEY_Y]: "Y",
    [KeyboardScanCode.KEY_Z]: "Z",
    [KeyboardScanCode.KEY_1]: "1",
    [KeyboardScanCode.KEY_2]: "2",
    [KeyboardScanCode.KEY_3]: "3",
    [KeyboardScanCode.KEY_4]: "4",
    [KeyboardScanCode.KEY_5]: "5",
    [KeyboardScanCode.KEY_6]: "6",
    [KeyboardScanCode.KEY_7]: "7",
    [KeyboardScanCode.KEY_8]: "8",
    [KeyboardScanCode.KEY_9]: "9",
    [KeyboardScanCode.KEY_0]: "0",
    [KeyboardScanCode.KEY_ENTER]: "ENTER",
    [KeyboardScanCode.KEY_ESC]: "ESC",
    [KeyboardScanCode.KEY_BACKSPACE]: "BACKSPACE",
    [KeyboardScanCode.KEY_TAB]: "TAB",
    [KeyboardScanCode.KEY_SPACE]: "SPACE",
    [KeyboardScanCode.KEY_MINUS]: "MINUS",
    [KeyboardScanCode.KEY_EQUAL]: "EQUAL",
    [KeyboardScanCode.KEY_LEFT_BRACE]: "LEFT BRACE",
    [KeyboardScanCode.KEY_RIGHT_BRACE]: "RIGHT BRACE",
    [KeyboardScanCode.KEY_BACKSLASH]: "BACKSLASH",
    [KeyboardScanCode.KEY_NON_US_NUM]: "NON US NUM",
    [KeyboardScanCode.KEY_SEMICOLON]: "SEMICOLON",
    [KeyboardScanCode.KEY_QUOTE]: "QUOTE",
    [KeyboardScanCode.KEY_TILDE]: "TILDE",
    [KeyboardScanCode.KEY_COMMA]: "COMMA",
    [KeyboardScanCode.KEY_PERIOD]: "PERIOD",
    [KeyboardScanCode.KEY_SLASH]: "SLASH",
    [KeyboardScanCode.KEY_CAPS_LOCK]: "CAPS LOCK",
    [KeyboardScanCode.KEY_F1]: "F1",
    [KeyboardScanCode.KEY_F2]: "F2",
    [KeyboardScanCode.KEY_F3]: "F3",
    [KeyboardScanCode.KEY_F4]: "F4",
    [KeyboardScanCode.KEY_F5]: "F5",
    [KeyboardScanCode.KEY_F6]: "F6",
    [KeyboardScanCode.KEY_F7]: "F7",
    [KeyboardScanCode.KEY_F8]: "F8",
    [KeyboardScanCode.KEY_F9]: "F9",
    [KeyboardScanCode.KEY_F10]: "F10",
    [KeyboardScanCode.KEY_F11]: "F11",
    [KeyboardScanCode.KEY_F12]: "F12",
    [KeyboardScanCode.KEY_PRINT]: "PRINT",
    [KeyboardScanCode.KEY_SCROLL_LOCK]: "SCROLL LOCK",
    [KeyboardScanCode.KEY_PAUSE]: "PAUSE",
    [KeyboardScanCode.KEY_INSERT]: "INSERT",
    [KeyboardScanCode.KEY_HOME]: "HOME",
    [KeyboardScanCode.KEY_PAGE_UP]: "PAGE UP",
    [KeyboardScanCode.KEY_DELETE]: "DELETE",
    [KeyboardScanCode.KEY_END]: "END",
    [KeyboardScanCode.KEY_PAGE_DOWN]: "PAGE DOWN",
    [KeyboardScanCode.KEY_RIGHT_ARROW]: "RIGHT",
    [KeyboardScanCode.KEY_LEFT_ARROW]: "LEFT",
    [KeyboardScanCode.KEY_DOWN_ARROW]: "DOWN",
    [KeyboardScanCode.KEY_UP_ARROW]: "UP",
    [KeyboardScanCode.KEY_NUM_LOCK]: "NUM LOCK",
    [KeyboardScanCode.KEYPAD_DIVIDE]: "NUMPAD /",
    [KeyboardScanCode.KEYPAD_MULTIPLY]: "NUMPAD *",
    [KeyboardScanCode.KEYPAD_SUBTRACT]: "NUMPAD -",
    [KeyboardScanCode.KEYPAD_ADD]: "NUMPAD +",
    [KeyboardScanCode.KEYPAD_ENTER]: "NUMPAD ENTER",
    [KeyboardScanCode.KEYPAD_1]: "NUMPAD 1",
    [KeyboardScanCode.KEYPAD_2]: "NUMPAD 2",
    [KeyboardScanCode.KEYPAD_3]: "NUMPAD 3",
    [KeyboardScanCode.KEYPAD_4]: "NUMPAD 4",
    [KeyboardScanCode.KEYPAD_5]: "NUMPAD 5",
    [KeyboardScanCode.KEYPAD_6]: "NUMPAD 6",
    [KeyboardScanCode.KEYPAD_7]: "NUMPAD 7",
    [KeyboardScanCode.KEYPAD_8]: "NUMPAD 8",
    [KeyboardScanCode.KEYPAD_9]: "NUMPAD 9",
    [KeyboardScanCode.KEYPAD_0]: "NUMPAD 0",
    [KeyboardScanCode.KEYPAD_DOT]: "NUMPAD .",
    [KeyboardScanCode.KEY_NON_US]: "NON US",
    [KeyboardScanCode.KEY_MENU]: "MENU",
    [KeyboardScanCode.KEY_POWER]: "POWER", // PowerOff (Ubuntu)
    [KeyboardScanCode.KEY_PAD_EQUALS]: "PAD EQUALS", // Dont confuse with KEYPAD_EQUAL_SIGN
    [KeyboardScanCode.KEY_F13]: "F13", // Tools (Ubunutu)
    [KeyboardScanCode.KEY_F14]: "F14", // Launch5 (Ubuntu)
    [KeyboardScanCode.KEY_F15]: "F15", // Launch6 (Ubuntu)
    [KeyboardScanCode.KEY_F16]: "F16", // Launch7 (Ubuntu)
    [KeyboardScanCode.KEY_F17]: "F17", // Launch8 (Ubuntu)
    [KeyboardScanCode.KEY_F18]: "F18", // Launch9 (Ubuntu)
    [KeyboardScanCode.KEY_F19]: "F19", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_F20]: "F20", // AudioMicMute (Ubuntu)
    [KeyboardScanCode.KEY_F21]: "F21", // Touchpad toggle (Ubuntu)
    [KeyboardScanCode.KEY_F22]: "F22", // TouchpadOn (Ubuntu)
    [KeyboardScanCode.KEY_F23]: "F23", // TouchpadOff Ubuntu)
    [KeyboardScanCode.KEY_F24]: "F24", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_EXECUTE]: "EXECUTE", // Open (Ubuntu)
    [KeyboardScanCode.KEY_HELP]: "HELP", // Help (Ubuntu)
    [KeyboardScanCode.KEY_MENU2]: "MENU2", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_SELECT]: "SELECT", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_STOP]: "STOP", // Cancel (Ubuntu)
    [KeyboardScanCode.KEY_AGAIN]: "AGAIN", // Redo (Ubuntu)
    [KeyboardScanCode.KEY_UNDO]: "UNDO", // Undo (Ubuntu)
    [KeyboardScanCode.KEY_CUT]: "CUT", // Cut (Ubuntu)
    [KeyboardScanCode.KEY_COPY]: "COPY", // Copy (Ubuntu)
    [KeyboardScanCode.KEY_PASTE]: "PASTE", // Paste (Ubuntu)
    [KeyboardScanCode.KEY_FIND]: "FIND", // Find (Ubuntu)
    [KeyboardScanCode.KEY_VOLUME_MUTE]: "VOLUME MUTE",
    [KeyboardScanCode.KEY_VOLUME_UP]: "VOLUME UP",
    [KeyboardScanCode.KEY_VOLUME_DOWN]: "VOLUME DOWN",
    [KeyboardScanCode.KEY_LOCKING_CAPS_LOCK]: "LOCKING CAPS LOCK", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LOCKING_NUM_LOCK]: "LOCKING NUM LOCK", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LOCKING_SCROLL_LOCK]: "LOCKING SCROLL LOCK", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_COMMA]: "KEYPAD COMMA", // .
    [KeyboardScanCode.KEYPAD_EQUAL_SIGN]: "KEYPAD EQUAL SIGN", // Disabled (Ubuntu), Dont confuse with KEYPAD_EQUAL
    [KeyboardScanCode.KEY_INTERNATIONAL1]: "INTERNATIONAL 1", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_INTERNATIONAL2]: "INTERNATIONAL 2", // Hiragana Katakana (Ubuntu)
    [KeyboardScanCode.KEY_INTERNATIONAL3]: "INTERNATIONAL 3", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_INTERNATIONAL4]: "INTERNATIONAL 4", // Henkan (Ubuntu)
    [KeyboardScanCode.KEY_INTERNATIONAL5]: "INTERNATIONAL 5", // Muhenkan (Ubuntu)
    [KeyboardScanCode.KEY_INTERNATIONAL6]: "INTERNATIONAL 6", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_INTERNATIONAL7]: "INTERNATIONAL 7", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_INTERNATIONAL8]: "INTERNATIONAL 8", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_INTERNATIONAL9]: "INTERNATIONAL 9", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LANG1]: "LANG 1", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LANG2]: "LANG 2", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LANG3]: "LANG 3", // Katakana (Ubuntu)
    [KeyboardScanCode.KEY_LANG4]: "LANG 4", // Hiragana (Ubuntu)
    [KeyboardScanCode.KEY_LANG5]: "LANG 5", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LANG6]: "LANG 6", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LANG7]: "LANG 7", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LANG8]: "LANG 8", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LANG9]: "LANG 9", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_ALTERNATE_ERASE]: "ALTERNATE ERASE", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_SYSREQ_ATTENTION]: "SYSREQ ATTENTION", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_CANCEL]: "CANCEL", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_CLEAR]: "CLEAR", // Delete (Ubuntu)
    [KeyboardScanCode.KEY_PRIOR]: "PRIOR", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_RETURN2]: "RETURN2", // Disabled (Ubuntu), Do not confuse this with KEY_ENTER
    [KeyboardScanCode.KEY_SEPARATOR]: "SEPARATOR", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_OUT]: "OUT", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_OPER]: "OPER", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_CLEAR_AGAIN]: "CLEAR AGAIN", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_CRSEL_PROPS]: "CRSEL PROPS", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_EXSEL]: "EXSEL", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_PAD_00]: "PAD_00", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_PAD_000]: "PAD_000", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_THOUSANDS_SEPARATOR]: "THOUSANDS SEPARATOR", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_DECIMAL_SEPARATOR]: "DECIMAL SEPARATOR", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_CURRENCY_UNIT]: "CURRENCY UNIT", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_CURRENCY_SUB_UNIT]: "CURRENCY SUB UNIT", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_LEFT_BRACE]: "KEYPAD LEFT BRACE", // (
    [KeyboardScanCode.KEYPAD_RIGHT_BRACE]: "KEYPAD RIGHT BRACE", // )
    [KeyboardScanCode.KEYPAD_LEFT_CURLY_BRACE]: "KEYPAD LEFT CURLY BRACE", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_RIGHT_CURLY_BRACE]: "KEYPAD RIGHT CURLY BRACE", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_TAB]: "KEYPAD TAB", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_BACKSPACE]: "KEYPAD BACKSPACE", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_A]: "KEYPAD A", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_B]: "KEYPAD B", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_C]: "KEYPAD C", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_D]: "KEYPAD D", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_E]: "KEYPAD E", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_F]: "KEYPAD F", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_XOR]: "KEYPAD XOR", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_CARET]: "KEYPAD CARET", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_PERCENT]: "KEYPAD PERCENT", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_LESS_THAN]: "KEYPAD LESS THAN", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_GREATER_THAN]: "KEYPAD GREATER THAN", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_AMPERSAND]: "KEYPAD AMPERSAND", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_DOUBLEAMPERSAND]: "KEYPAD DOUBLEAMPERSAND", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_PIPE]: "KEYPAD PIPE", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_DOUBLEPIPE]: "KEYPAD DOUBLEPIPE", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_COLON]: "KEYPAD COLON", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_POUND_SIGN]: "KEYPAD POUND SIGN", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_SPACE]: "KEYPAD SPACE", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_AT_SIGN]: "[KeyboardScanCode.KEYPAD_AT SIGN", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_EXCLAMATION_POINT]: "KEYPAD EXCLAMATION POINT", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_MEMORY_STORE]: "KEYPAD MEMORY STORE", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_MEMORY_RECALL]: "KEYPAD MEMORY RECALL", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_MEMORY_CLEAR]: "KEYPAD MEMORY CLEAR", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_MEMORY_ADD]: "KEYPAD MEMORY ADD", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_MEMORY_SUBTRACT]: "KEYPAD MEMORY SUBTRACT", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_MEMORY_MULTIPLY]: "KEYPAD MEMORY MULTIPLY", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_MEMORY_DIVIDE]: "KEYPAD MEMORY DIVIDE", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_PLUS_MINUS]: "KEYPAD PLUS MINUS", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_CLEAR]: "KEYPAD CLEAR", // Delete (Ubuntu)
    [KeyboardScanCode.KEYPAD_CLEAR_ENTRY]: "KEYPAD CLEAR ENTRY", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_BINARY]: "KEYPAD BINARY", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_OCTAL]: "KEYPAD OCTAL", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_DECIMAL]: "KEYPAD DECIMAL", // Disabled (Ubuntu)
    [KeyboardScanCode.KEYPAD_HEXADECIMAL]: "KEYPAD HEXADECIMAL", // Disabled (Ubuntu)
    [KeyboardScanCode.KEY_LEFT_CTRL]: "LEFT CTRL",
    [KeyboardScanCode.KEY_LEFT_SHIFT]: "LEFT SHIFT",
    [KeyboardScanCode.KEY_LEFT_ALT]: "LEFT ALT",
    [KeyboardScanCode.KEY_LEFT_GUI]: "LEFT GUI",
    [KeyboardScanCode.KEY_RIGHT_CTRL]: "RIGHT CTRL",
    [KeyboardScanCode.KEY_RIGHT_SHIFT]: "RIGHT SHIFT",
    [KeyboardScanCode.KEY_RIGHT_ALT]: "RIGHT ALT",
    [KeyboardScanCode.KEY_RIGHT_GUI]: "RIGHT GUI",
};

export const KeyboardScanCodeShortName: {[key in KeyboardScanCode]: string}= {
    [KeyboardScanCode.KEY_USER_DEFINED]: "keyboard.shortcode.user",
    [KeyboardScanCode.KEY_ERROR_ROLLOVER]: "ROLVR",
    [KeyboardScanCode.KEY_POST_FAIL]: "PFAIL",
    [KeyboardScanCode.KEY_ERROR_UNDEFINED]: "ERRUN",
    [KeyboardScanCode.KEY_A]: "A",
    [KeyboardScanCode.KEY_B]: "B",
    [KeyboardScanCode.KEY_C]: "C",
    [KeyboardScanCode.KEY_D]: "D",
    [KeyboardScanCode.KEY_E]: "E",
    [KeyboardScanCode.KEY_F]: "F",
    [KeyboardScanCode.KEY_G]: "G",
    [KeyboardScanCode.KEY_H]: "H",
    [KeyboardScanCode.KEY_I]: "I",
    [KeyboardScanCode.KEY_J]: "J",
    [KeyboardScanCode.KEY_K]: "K",
    [KeyboardScanCode.KEY_L]: "L",
    [KeyboardScanCode.KEY_M]: "M",
    [KeyboardScanCode.KEY_N]: "N",
    [KeyboardScanCode.KEY_O]: "O",
    [KeyboardScanCode.KEY_P]: "P",
    [KeyboardScanCode.KEY_Q]: "Q",
    [KeyboardScanCode.KEY_R]: "R",
    [KeyboardScanCode.KEY_S]: "S",
    [KeyboardScanCode.KEY_T]: "T",
    [KeyboardScanCode.KEY_U]: "U",
    [KeyboardScanCode.KEY_V]: "V",
    [KeyboardScanCode.KEY_W]: "W",
    [KeyboardScanCode.KEY_X]: "X",
    [KeyboardScanCode.KEY_Y]: "Y",
    [KeyboardScanCode.KEY_Z]: "Z",
    [KeyboardScanCode.KEY_1]: "1",
    [KeyboardScanCode.KEY_2]: "2",
    [KeyboardScanCode.KEY_3]: "3",
    [KeyboardScanCode.KEY_4]: "4",
    [KeyboardScanCode.KEY_5]: "5",
    [KeyboardScanCode.KEY_6]: "6",
    [KeyboardScanCode.KEY_7]: "7",
    [KeyboardScanCode.KEY_8]: "8",
    [KeyboardScanCode.KEY_9]: "9",
    [KeyboardScanCode.KEY_0]: "0",
    [KeyboardScanCode.KEY_ENTER]: "ENTER",
    [KeyboardScanCode.KEY_ESC]: "ESC",
    [KeyboardScanCode.KEY_BACKSPACE]: "BKSP",
    [KeyboardScanCode.KEY_TAB]: "TAB",
    [KeyboardScanCode.KEY_SPACE]: "SPACE",
    [KeyboardScanCode.KEY_MINUS]: "-",
    [KeyboardScanCode.KEY_EQUAL]: "=",
    [KeyboardScanCode.KEY_LEFT_BRACE]: "[",
    [KeyboardScanCode.KEY_RIGHT_BRACE]: "]",
    [KeyboardScanCode.KEY_BACKSLASH]: "\\",
    [KeyboardScanCode.KEY_NON_US_NUM]: "NONU",
    [KeyboardScanCode.KEY_SEMICOLON]: ";",
    [KeyboardScanCode.KEY_QUOTE]: "\"",	
    [KeyboardScanCode.KEY_TILDE]: "~",
    [KeyboardScanCode.KEY_COMMA]: ",",
    [KeyboardScanCode.KEY_PERIOD]: ".",
    [KeyboardScanCode.KEY_SLASH]: "/",
    [KeyboardScanCode.KEY_CAPS_LOCK]: "CAPS",
    [KeyboardScanCode.KEY_F1]: "F1",
    [KeyboardScanCode.KEY_F2]: "F2",
    [KeyboardScanCode.KEY_F3]: "F3",
    [KeyboardScanCode.KEY_F4]: "F4",
    [KeyboardScanCode.KEY_F5]: "F5",
    [KeyboardScanCode.KEY_F6]: "F6",
    [KeyboardScanCode.KEY_F7]: "F7",
    [KeyboardScanCode.KEY_F8]: "F8",
    [KeyboardScanCode.KEY_F9]: "F9",
    [KeyboardScanCode.KEY_F10]: "F10",
    [KeyboardScanCode.KEY_F11]: "F11",
    [KeyboardScanCode.KEY_F12]: "F12",
    [KeyboardScanCode.KEY_PRINT]: "PRNT",
    [KeyboardScanCode.KEY_SCROLL_LOCK]: "SCRL",
    [KeyboardScanCode.KEY_PAUSE]: "PAUSE",
    [KeyboardScanCode.KEY_INSERT]: "INSRT",
    [KeyboardScanCode.KEY_HOME]: "HOME",
    [KeyboardScanCode.KEY_PAGE_UP]: "PGUP",
    [KeyboardScanCode.KEY_DELETE]: "DEL",
    [KeyboardScanCode.KEY_END]: "END",
    [KeyboardScanCode.KEY_PAGE_DOWN]: "PGDN",
    [KeyboardScanCode.KEY_RIGHT_ARROW]: "RGHT",
    [KeyboardScanCode.KEY_LEFT_ARROW]: "LEFT",
    [KeyboardScanCode.KEY_DOWN_ARROW]: "DOWN",
    [KeyboardScanCode.KEY_UP_ARROW]: "UP",
    [KeyboardScanCode.KEY_NUM_LOCK]: "NUMLK",
    [KeyboardScanCode.KEYPAD_DIVIDE]: "NUM /",
    [KeyboardScanCode.KEYPAD_MULTIPLY]: "NUM *",
    [KeyboardScanCode.KEYPAD_SUBTRACT]: "NUM -",
    [KeyboardScanCode.KEYPAD_ADD]: "NUM +",
    [KeyboardScanCode.KEYPAD_ENTER]: "N ENT",
    [KeyboardScanCode.KEYPAD_1]: "NUM 1",
    [KeyboardScanCode.KEYPAD_2]: "NUM 2",
    [KeyboardScanCode.KEYPAD_3]: "NUM 3",
    [KeyboardScanCode.KEYPAD_4]: "NUM 4",
    [KeyboardScanCode.KEYPAD_5]: "NUM 5",
    [KeyboardScanCode.KEYPAD_6]: "NUM 6",
    [KeyboardScanCode.KEYPAD_7]: "NUM 7",
    [KeyboardScanCode.KEYPAD_8]: "NUM 8",
    [KeyboardScanCode.KEYPAD_9]: "NUM 9",
    [KeyboardScanCode.KEYPAD_0]: "NUM 0",
    [KeyboardScanCode.KEYPAD_DOT]: "NUM .",
    [KeyboardScanCode.KEY_NON_US]: "NUS",
    [KeyboardScanCode.KEY_MENU]: "MENU",
    [KeyboardScanCode.KEY_POWER]: "PWR",
    [KeyboardScanCode.KEY_PAD_EQUALS]: "PDEQ",
    [KeyboardScanCode.KEY_F13]: "F13",
    [KeyboardScanCode.KEY_F14]: "F14",
    [KeyboardScanCode.KEY_F15]: "F15",
    [KeyboardScanCode.KEY_F16]: "F16",
    [KeyboardScanCode.KEY_F17]: "F17",
    [KeyboardScanCode.KEY_F18]: "F18",
    [KeyboardScanCode.KEY_F19]: "F19",
    [KeyboardScanCode.KEY_F20]: "F20",
    [KeyboardScanCode.KEY_F21]: "F21",
    [KeyboardScanCode.KEY_F22]: "F22",
    [KeyboardScanCode.KEY_F23]: "F23",
    [KeyboardScanCode.KEY_F24]: "F24",
    [KeyboardScanCode.KEY_EXECUTE]: "EXEC",
    [KeyboardScanCode.KEY_HELP]: "HELP",
    [KeyboardScanCode.KEY_MENU2]: "MNU2",
    [KeyboardScanCode.KEY_SELECT]: "SELE",
    [KeyboardScanCode.KEY_STOP]: "STOP",
    [KeyboardScanCode.KEY_AGAIN]: "AGN",
    [KeyboardScanCode.KEY_UNDO]: "UNDO",
    [KeyboardScanCode.KEY_CUT]: "CUT",
    [KeyboardScanCode.KEY_COPY]: "COPY",
    [KeyboardScanCode.KEY_PASTE]: "PASTE",
    [KeyboardScanCode.KEY_FIND]: "FIND",
    [KeyboardScanCode.KEY_VOLUME_MUTE]: "MUTE",
    [KeyboardScanCode.KEY_VOLUME_UP]: "VOL +",
    [KeyboardScanCode.KEY_VOLUME_DOWN]: "VOL -",
    [KeyboardScanCode.KEY_LOCKING_CAPS_LOCK]: "LCP",
    [KeyboardScanCode.KEY_LOCKING_NUM_LOCK]: "LNUM",
    [KeyboardScanCode.KEY_LOCKING_SCROLL_LOCK]: "LSCR",
    [KeyboardScanCode.KEYPAD_COMMA]: "KP,",
    [KeyboardScanCode.KEYPAD_EQUAL_SIGN]: "KPEQ",
    [KeyboardScanCode.KEY_INTERNATIONAL1]: "INT1",
    [KeyboardScanCode.KEY_INTERNATIONAL2]: "INT2",
    [KeyboardScanCode.KEY_INTERNATIONAL3]: "INT3",
    [KeyboardScanCode.KEY_INTERNATIONAL4]: "INT4",
    [KeyboardScanCode.KEY_INTERNATIONAL5]: "INT5",
    [KeyboardScanCode.KEY_INTERNATIONAL6]: "INT6",
    [KeyboardScanCode.KEY_INTERNATIONAL7]: "INT7",
    [KeyboardScanCode.KEY_INTERNATIONAL8]: "INT8",
    [KeyboardScanCode.KEY_INTERNATIONAL9]: "INT9",
    [KeyboardScanCode.KEY_LANG1]: "LG1",
    [KeyboardScanCode.KEY_LANG2]: "LG2",
    [KeyboardScanCode.KEY_LANG3]: "LG3",
    [KeyboardScanCode.KEY_LANG4]: "LG4",
    [KeyboardScanCode.KEY_LANG5]: "LG5",
    [KeyboardScanCode.KEY_LANG6]: "LG6",
    [KeyboardScanCode.KEY_LANG7]: "LG7",
    [KeyboardScanCode.KEY_LANG8]: "LG8",
    [KeyboardScanCode.KEY_LANG9]: "LG9",
    [KeyboardScanCode.KEY_ALTERNATE_ERASE]: "AER",
    [KeyboardScanCode.KEY_SYSREQ_ATTENTION]: "SRAT",
    [KeyboardScanCode.KEY_CANCEL]: "CANC",
    [KeyboardScanCode.KEY_CLEAR]: "CLR",
    [KeyboardScanCode.KEY_PRIOR]: "PRIO",
    [KeyboardScanCode.KEY_RETURN2]: "RET2",
    [KeyboardScanCode.KEY_SEPARATOR]: "SEPA",
    [KeyboardScanCode.KEY_OUT]: "OUT",
    [KeyboardScanCode.KEY_OPER]: "OPER",
    [KeyboardScanCode.KEY_CLEAR_AGAIN]: "CLAG",
    [KeyboardScanCode.KEY_CRSEL_PROPS]: "CRSL",
    [KeyboardScanCode.KEY_EXSEL]: "EXSL",
    [KeyboardScanCode.KEY_PAD_00]: "P00",
    [KeyboardScanCode.KEY_PAD_000]: "P000",
    [KeyboardScanCode.KEY_THOUSANDS_SEPARATOR]: "TSEP",
    [KeyboardScanCode.KEY_DECIMAL_SEPARATOR]: "DSEP",
    [KeyboardScanCode.KEY_CURRENCY_UNIT]: "CURU",
    [KeyboardScanCode.KEY_CURRENCY_SUB_UNIT]: "CSUB",
    [KeyboardScanCode.KEYPAD_LEFT_BRACE]: "KP(",
    [KeyboardScanCode.KEYPAD_RIGHT_BRACE]: "KP)",
    [KeyboardScanCode.KEYPAD_LEFT_CURLY_BRACE]: "KP{",
    [KeyboardScanCode.KEYPAD_RIGHT_CURLY_BRACE]: "KP}",
    [KeyboardScanCode.KEYPAD_TAB]: "KPTB",
    [KeyboardScanCode.KEYPAD_BACKSPACE]: "KPBS",
    [KeyboardScanCode.KEYPAD_A]: "KPA",
    [KeyboardScanCode.KEYPAD_B]: "KPB",
    [KeyboardScanCode.KEYPAD_C]: "KPC",
    [KeyboardScanCode.KEYPAD_D]: "KPD",
    [KeyboardScanCode.KEYPAD_E]: "KPE",
    [KeyboardScanCode.KEYPAD_F]: "KPF",
    [KeyboardScanCode.KEYPAD_XOR]: "XOR",
    [KeyboardScanCode.KEYPAD_CARET]: "KPC^",
    [KeyboardScanCode.KEYPAD_PERCENT]: "KP%",
    [KeyboardScanCode.KEYPAD_LESS_THAN]: "KP<",
    [KeyboardScanCode.KEYPAD_GREATER_THAN]: "KP>",
    [KeyboardScanCode.KEYPAD_AMPERSAND]: "KP&",
    [KeyboardScanCode.KEYPAD_DOUBLEAMPERSAND]: "K&&",
    [KeyboardScanCode.KEYPAD_PIPE]: "KP|",
    [KeyboardScanCode.KEYPAD_DOUBLEPIPE]: "KP||",
    [KeyboardScanCode.KEYPAD_COLON]: "KP:",
    [KeyboardScanCode.KEYPAD_POUND_SIGN]: "KP#",
    [KeyboardScanCode.KEYPAD_SPACE]: "KP_",
    [KeyboardScanCode.KEYPAD_AT_SIGN]: "KP@",
    [KeyboardScanCode.KEYPAD_EXCLAMATION_POINT]: "KP!",
    [KeyboardScanCode.KEYPAD_MEMORY_STORE]: "KMS",
    [KeyboardScanCode.KEYPAD_MEMORY_RECALL]: "KMR",
    [KeyboardScanCode.KEYPAD_MEMORY_CLEAR]: "KMC",
    [KeyboardScanCode.KEYPAD_MEMORY_ADD]: "KMA",
    [KeyboardScanCode.KEYPAD_MEMORY_SUBTRACT]: "KMS-",
    [KeyboardScanCode.KEYPAD_MEMORY_MULTIPLY]: "KMX",
    [KeyboardScanCode.KEYPAD_MEMORY_DIVIDE]: "KMD",
    [KeyboardScanCode.KEYPAD_PLUS_MINUS]: "KP+-",
    [KeyboardScanCode.KEYPAD_CLEAR]: "KPCL",
    [KeyboardScanCode.KEYPAD_CLEAR_ENTRY]: "KPE",
    [KeyboardScanCode.KEYPAD_BINARY]: "KP2",
    [KeyboardScanCode.KEYPAD_OCTAL]: "KP8",
    [KeyboardScanCode.KEYPAD_DECIMAL]: "KP10",
    [KeyboardScanCode.KEYPAD_HEXADECIMAL]: "KP16",
    [KeyboardScanCode.KEY_LEFT_CTRL]: "LCTR",
    [KeyboardScanCode.KEY_LEFT_SHIFT]: "LSHF",
    [KeyboardScanCode.KEY_LEFT_ALT]: "LALT",
    [KeyboardScanCode.KEY_LEFT_GUI]: "LGUI",
    [KeyboardScanCode.KEY_RIGHT_CTRL]: "RCTR",
    [KeyboardScanCode.KEY_RIGHT_SHIFT]: "RSHF",
    [KeyboardScanCode.KEY_RIGHT_ALT]: "RALT",
    [KeyboardScanCode.KEY_RIGHT_GUI]: "RGUI",
    [KeyboardScanCode.KEY_RIGHT_WINDOWS]: "RWND",
};

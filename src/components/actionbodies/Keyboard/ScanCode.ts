export enum KeyboardScanCode {
    KEY_USER_DEFINED    =  0,
    KEY_ERROR_ROLLOVER  =  1,
    KEY_POST_FAIL       =  2,
    KEY_ERROR_UNDEFINED =  3,
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

    // Most of the following keys will only work with Linux or not at all.
    // F13+ keys are mostly used for laptop functions like ECO key.
    KEY_POWER           = 0x66, // PowerOff (Ubuntu)
    KEY_PAD_EQUALS      = 0x67, // Dont confuse with KEYPAD_EQUAL_SIGN
    KEY_F13             = 0x68, // Tools (Ubunutu)
    KEY_F14             = 0x69, // Launch5 (Ubuntu)
    KEY_F15             = 0x6A, // Launch6 (Ubuntu)
    KEY_F16             = 0x6B, // Launch7 (Ubuntu)
    KEY_F17             = 0x6C, // Launch8 (Ubuntu)
    KEY_F18             = 0x6D, // Launch9 (Ubuntu)
    KEY_F19             = 0x6E, // Disabled (Ubuntu)
    KEY_F20             = 0x6F, // AudioMicMute (Ubuntu)
    KEY_F21             = 0x70, // Touchpad toggle (Ubuntu)
    KEY_F22             = 0x71, // TouchpadOn (Ubuntu)
    KEY_F23             = 0x72, // TouchpadOff Ubuntu)
    KEY_F24             = 0x73, // Disabled (Ubuntu)
    KEY_EXECUTE         = 0x74, // Open (Ubuntu)
    KEY_HELP            = 0x75, // Help (Ubuntu)
    KEY_MENU2           = 0x76, // Disabled (Ubuntu)
    KEY_SELECT          = 0x77, // Disabled (Ubuntu)
    KEY_STOP            = 0x78, // Cancel (Ubuntu)
    KEY_AGAIN           = 0x79, // Redo (Ubuntu)
    KEY_UNDO            = 0x7A, // Undo (Ubuntu)
    KEY_CUT             = 0x7B, // Cut (Ubuntu)
    KEY_COPY            = 0x7C, // Copy (Ubuntu)
    KEY_PASTE           = 0x7D, // Paste (Ubuntu)
    KEY_FIND            = 0x7E, // Find (Ubuntu)
    KEY_MUTE            = 0x7F,
    KEY_VOLUME_MUTE     = 0x7F, // Alias
    KEY_VOLUME_UP       = 0x80,
    KEY_VOLUME_DOWN     = 0x81,
    KEY_LOCKING_CAPS_LOCK   = 0x82, // Disabled (Ubuntu)
    KEY_LOCKING_NUM_LOCK    = 0x83, // Disabled (Ubuntu)
    KEY_LOCKING_SCROLL_LOCK = 0x84, // Disabled (Ubuntu)
    KEYPAD_COMMA            = 0x85, // .
    KEYPAD_EQUAL_SIGN       = 0x86, // Disabled (Ubuntu), Dont confuse with KEYPAD_EQUAL
    KEY_INTERNATIONAL1      = 0x87, // Disabled (Ubuntu)
    KEY_INTERNATIONAL2      = 0x88, // Hiragana Katakana (Ubuntu)
    KEY_INTERNATIONAL3      = 0x89, // Disabled (Ubuntu)
    KEY_INTERNATIONAL4      = 0x8A, // Henkan (Ubuntu)
    KEY_INTERNATIONAL5      = 0x8B, // Muhenkan (Ubuntu)
    KEY_INTERNATIONAL6      = 0x8C, // Disabled (Ubuntu)
    KEY_INTERNATIONAL7      = 0x8D, // Disabled (Ubuntu)
    KEY_INTERNATIONAL8      = 0x8E, // Disabled (Ubuntu)
    KEY_INTERNATIONAL9      = 0x8F, // Disabled (Ubuntu)
    KEY_LANG1               = 0x90, // Disabled (Ubuntu)
    KEY_LANG2               = 0x91, // Disabled (Ubuntu)
    KEY_LANG3               = 0x92, // Katakana (Ubuntu)
    KEY_LANG4               = 0x93, // Hiragana (Ubuntu)
    KEY_LANG5               = 0x94, // Disabled (Ubuntu)
    KEY_LANG6               = 0x95, // Disabled (Ubuntu)
    KEY_LANG7               = 0x96, // Disabled (Ubuntu)
    KEY_LANG8               = 0x97, // Disabled (Ubuntu)
    KEY_LANG9               = 0x98, // Disabled (Ubuntu)
    KEY_ALTERNATE_ERASE     = 0x99, // Disabled (Ubuntu)
    KEY_SYSREQ_ATTENTION    = 0x9A, // Disabled (Ubuntu)
    KEY_CANCEL              = 0x9B, // Disabled (Ubuntu)
    KEY_CLEAR               = 0x9C, // Delete (Ubuntu)
    KEY_PRIOR               = 0x9D, // Disabled (Ubuntu)
    KEY_RETURN2             = 0x9E, // Disabled (Ubuntu), Do not confuse this with KEY_ENTER
    KEY_SEPARATOR           = 0x9F, // Disabled (Ubuntu)
    KEY_OUT                 = 0xA0, // Disabled (Ubuntu)
    KEY_OPER                = 0xA1, // Disabled (Ubuntu)
    KEY_CLEAR_AGAIN         = 0xA2, // Disabled (Ubuntu)
    KEY_CRSEL_PROPS         = 0xA3, // Disabled (Ubuntu)
    KEY_EXSEL               = 0xA4, // Disabled (Ubuntu)

    KEY_PAD_00                  = 0xB0, // Disabled (Ubuntu)
    KEY_PAD_000                 = 0xB1, // Disabled (Ubuntu)
    KEY_THOUSANDS_SEPARATOR     = 0xB2, // Disabled (Ubuntu)
    KEY_DECIMAL_SEPARATOR       = 0xB3, // Disabled (Ubuntu)
    KEY_CURRENCY_UNIT           = 0xB4, // Disabled (Ubuntu)
    KEY_CURRENCY_SUB_UNIT       = 0xB5, // Disabled (Ubuntu)
    KEYPAD_LEFT_BRACE           = 0xB6, // (
    KEYPAD_RIGHT_BRACE          = 0xB7, // )
    KEYPAD_LEFT_CURLY_BRACE     = 0xB8, // Disabled (Ubuntu)
    KEYPAD_RIGHT_CURLY_BRACE    = 0xB9, // Disabled (Ubuntu)
    KEYPAD_TAB                  = 0xBA, // Disabled (Ubuntu)
    KEYPAD_BACKSPACE            = 0xBB, // Disabled (Ubuntu)
    KEYPAD_A                    = 0xBC, // Disabled (Ubuntu)
    KEYPAD_B                    = 0xBD, // Disabled (Ubuntu)
    KEYPAD_C                    = 0xBE, // Disabled (Ubuntu)
    KEYPAD_D                    = 0xBF, // Disabled (Ubuntu)
    KEYPAD_E                    = 0xC0, // Disabled (Ubuntu)
    KEYPAD_F                    = 0xC1, // Disabled (Ubuntu)
    KEYPAD_XOR                  = 0xC2, // Disabled (Ubuntu)
    KEYPAD_CARET                = 0xC3, // Disabled (Ubuntu)
    KEYPAD_PERCENT              = 0xC4, // Disabled (Ubuntu)
    KEYPAD_LESS_THAN            = 0xC5, // Disabled (Ubuntu)
    KEYPAD_GREATER_THAN         = 0xC6, // Disabled (Ubuntu)
    KEYPAD_AMPERSAND            = 0xC7, // Disabled (Ubuntu)
    KEYPAD_DOUBLEAMPERSAND      = 0xC8, // Disabled (Ubuntu)
    KEYPAD_PIPE                 = 0xC9, // Disabled (Ubuntu)
    KEYPAD_DOUBLEPIPE           = 0xCA, // Disabled (Ubuntu)
    KEYPAD_COLON                = 0xCB, // Disabled (Ubuntu)
    KEYPAD_POUND_SIGN           = 0xCC, // Disabled (Ubuntu)
    KEYPAD_SPACE                = 0xCD, // Disabled (Ubuntu)
    KEYPAD_AT_SIGN              = 0xCE, // Disabled (Ubuntu)
    KEYPAD_EXCLAMATION_POINT    = 0xCF, // Disabled (Ubuntu)
    KEYPAD_MEMORY_STORE         = 0xD0, // Disabled (Ubuntu)
    KEYPAD_MEMORY_RECALL        = 0xD1, // Disabled (Ubuntu)
    KEYPAD_MEMORY_CLEAR         = 0xD2, // Disabled (Ubuntu)
    KEYPAD_MEMORY_ADD           = 0xD3, // Disabled (Ubuntu)
    KEYPAD_MEMORY_SUBTRACT      = 0xD4, // Disabled (Ubuntu)
    KEYPAD_MEMORY_MULTIPLY      = 0xD5, // Disabled (Ubuntu)
    KEYPAD_MEMORY_DIVIDE        = 0xD6, // Disabled (Ubuntu)
    KEYPAD_PLUS_MINUS           = 0xD7, // Disabled (Ubuntu)
    KEYPAD_CLEAR                = 0xD8, // Delete (Ubuntu)
    KEYPAD_CLEAR_ENTRY          = 0xD9, // Disabled (Ubuntu)
    KEYPAD_BINARY               = 0xDA, // Disabled (Ubuntu)
    KEYPAD_OCTAL                = 0xDB, // Disabled (Ubuntu)
    KEYPAD_DECIMAL              = 0xDC, // Disabled (Ubuntu)
    KEYPAD_HEXADECIMAL          = 0xDD, // Disabled (Ubuntu)

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
    [KeyboardScanCode.KEY_USER_DEFINED]: "User Defined",
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
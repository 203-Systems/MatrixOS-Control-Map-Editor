import type { KeyboardScanCode } from "./ScanCode";

export type KeyboardActionData = {
    key: KeyboardScanCode|undefined
    user_keycode: number|undefined
}
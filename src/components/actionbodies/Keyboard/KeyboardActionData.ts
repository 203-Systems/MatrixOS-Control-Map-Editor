import type { KeyboardScanCode } from "./ScanCode";

export type KeyboardActionData = {
    actionIdentifier: string,
    key: KeyboardScanCode | undefined
    user_keycode: number | undefined
}
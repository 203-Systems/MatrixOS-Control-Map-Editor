import type {KeyAction} from "$lib/types/Action";

export const copyActionsToClipboard = (data: KeyAction | undefined) => {
    const clipboardObject = {
        id: 'matrix-control-map-editor',
        data: data
    };

    if (data != undefined) {
        const serialized = JSON.stringify(clipboardObject);

        localStorage.setItem("matrixCMEclipboard", serialized)
    }
}

export const pasteActionsFromClipboard = (): (KeyAction | undefined) => {
    const clipboardData = localStorage.getItem("matrixCMEclipboard")

    console.log(clipboardData)

    if (clipboardData) {
        const parsed = JSON.parse(clipboardData);

        return parsed.data
    }

    return undefined
}
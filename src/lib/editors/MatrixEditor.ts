export class MatrixEditor {
    private editorKeys: { key: number, actions: object[] }[] = [];
    constructor() {
        for (let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                this.editorKeys.push({
                    key: x + 1 + ((y + 1) * 10),
                    actions: []
                })
            }
        }
    }

    private getNormalIndex(keyIndex: number): number {
        let x = Math.floor(keyIndex % 10)
        let y = Math.floor(keyIndex / 10)

        return (y - 1) * 8 + x - 1
    }

    addAction(keyIndex: number, actionIdentifier: string, action: object): void {
        // keyIndex has a XY format, so we want to format it back to a normal index
        this.editorKeys[this.getNormalIndex(keyIndex)].actions.push({
            actionIdentifier: actionIdentifier,
            actionData: action
        })
    }

    removeAction(keyIndex: number, actionIndex: number): void {
        this.editorKeys[this.getNormalIndex(keyIndex)].actions.splice(actionIndex, 1)
    }

    getActions(keyIndex: number): object[] {
        // console.log(this.editorKeys[this.getNormalIndex(keyIndex)].actions)

        return this.editorKeys[this.getNormalIndex(keyIndex)].actions
    }
}
export class MatrixEditor {
    private editorGrids: { layer: number, grid: { key: number, actions: object[] }[] }[] = [];
    public selectedLayer: number = 0;
    public refreshMatrixButton: (keyIndex: number, actions: object[]) => void = (keyIndex, actions) => { };

    constructor() {
        this.editorGrids.push({
            layer: 1,
            grid: []
        })

        for (let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                this.editorGrids[0].grid.push({
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
        this.editorGrids[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions.push({
            actionIdentifier: actionIdentifier,
            actionData: action
        })

        this.refreshMatrixButton(keyIndex, this.editorGrids[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions)
    }

    removeAction(keyIndex: number, actionIndex: number): void {
        this.editorGrids[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions.splice(actionIndex, 1)

        this.refreshMatrixButton(keyIndex, this.editorGrids[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions)
    }

    getActions(keyIndex: number): object[] {
        // console.log(this.editorGrids[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions)

        console.log(keyIndex)
        return this.editorGrids[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions
    }

    createLayer(): void {
        this.editorGrids.push({
            layer: this.editorGrids.length + 1,
            grid: []
        })

        for (let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                this.editorGrids[this.editorGrids.length - 1].grid.push({
                    key: x + 1 + ((y + 1) * 10),
                    actions: []
                })
            }
        }
    }
}
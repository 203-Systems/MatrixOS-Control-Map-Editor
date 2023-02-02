export class MatrixEditor {
    private editorLayers: { layer: number, grid: { key: number, actions: object[] }[] }[] = [];
    public selectedLayer: number = 0;
    public refreshMatrixButton: (keyIndex: number, actions: object[]) => void = (keyIndex, actions) => { };

    constructor() {
        this.editorLayers.push({
            layer: 1,
            grid: []
        })

        for (let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                this.editorLayers[0].grid.push({
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
        this.editorLayers[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions.push({
            actionIdentifier: actionIdentifier,
            actionData: action
        })

        this.refreshMatrixButton(keyIndex, this.editorLayers[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions)
    }

    removeAction(keyIndex: number, actionIndex: number): void {
        this.editorLayers[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions.splice(actionIndex, 1)

        this.refreshMatrixButton(keyIndex, this.editorLayers[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions)
    }

    getActions(keyIndex: number): object[] {
        // console.log(this.editorLayers[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions)

        return this.editorLayers[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions
    }

    getLayers(): object[] {
        return this.editorLayers.map(editorLayer => {
            return {
                layer: editorLayer.layer
            }
        })
    }

    createLayer(): void {
        this.editorLayers.push({
            layer: this.editorLayers.length + 1,
            grid: []
        })

        for (let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                this.editorLayers[this.editorLayers.length - 1].grid.push({
                    key: x + 1 + ((y + 1) * 10),
                    actions: []
                })
            }
        }
    }
}
import type { KeyID } from "$lib/types/KeyID";
import { actions } from "/src/components/actionbodies/ActionRegistry"
import type { Action, Effect, KeyConfig } from '$lib/types/Action';

export class KeymapEditor {
    private editorLayers: KeyConfig[][][] = []; //Layer, X, Y
    public selectedLayer: number = 0;
    public refreshDeviceButton: (key: KeyID, config: KeyConfig) => void = (key, config) => { };

    constructor() {
       this.createLayer();
    }

    addAction(key: KeyID, actionIdentifier: string): void {

        if(actions[actionIdentifier] === undefined) {
            console.error("Action not found");
            return;
        }
        
        if(Array.isArray(key)) {
            this.editorLayers[this.selectedLayer]?.[key[0]]?.[key[1]].actions.push(new actions[actionIdentifier]);
            this.refreshDeviceButton(key, this.editorLayers[this.selectedLayer]?.[key[0]]?.[key[1]]);
        }

    }

    removeAction(key: KeyID, actionIndex: number): void {
        if(Array.isArray(key)) {
            this.editorLayers[this.selectedLayer]?.[key[0]]?.[key[1]].actions.splice(actionIndex, 1);
            this.refreshDeviceButton(key, this.editorLayers[this.selectedLayer]?.[key[0]]?.[key[1]]);
        }
    }

    getActions(key: KeyID): KeyConfig | undefined {
        // console.log(this.editorLayers[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions)
        if(Array.isArray(key)) {
            return this.editorLayers[this.selectedLayer]?.[key[0]]?.[key[1]]
        }
        return undefined
    }

    getLayerCount(): number {
        return this.editorLayers.length;        
    }

    getSelectedLayer(): number {
        return this.selectedLayer;
    }
    
    selectLayer(layer: number): void {
        this.selectedLayer = layer;
    }

    createLayer(): void {
        this.editorLayers.push([])

        for (let y = 0; y < 8; y++) {
            this.editorLayers[this.editorLayers.length - 1].push([])
            for(let x = 0; x < 8; x++) {
                this.editorLayers[this.editorLayers.length - 1][y].push({actions: [], effects: []})
            }
        }
    }

    exportData() {
        /*
        To export the Data you have to access the this.editorLayers value
        The Dataset inside the Array looks like this:

        {
            layer, (number)
            grid (array) {  // This is where all the Action Data is
                key, (number)
                actions (action array)
            }
        }

        The structure of a single action can be different by model, but you can identify the model by the .type value
        You can check out the structure of the actions in lib/types
            - MidiActionData.ts
            - KeyboardActionData.ts

         */
    }
}
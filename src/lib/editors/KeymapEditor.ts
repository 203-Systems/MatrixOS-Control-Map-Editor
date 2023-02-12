import type { KeyID } from "$lib/types/KeyID";
import { actions } from "/src/components/actionbodies/ActionRegistry"
import type { Action, Effect, KeyConfig } from '$lib/types/Action';

export class KeymapEditor {
    private data: KeyConfig[][][] = []; //Layer, X, Y
    private selectedLayer: number = 0;
    private updateCallback:()=>void;
    
    constructor(updateCallbackFunc:()=>void) {
        this.updateCallback = updateCallbackFunc;
        this.createLayer();
    }

    addAction(key: KeyID, actionIdentifier: string): void {

        if(actions[actionIdentifier] === undefined) {
            console.error("Action not found");
            return;
        }
        
        if(Array.isArray(key)) {
            this.data[this.selectedLayer]?.[key[0]]?.[key[1]].actions.push(new actions[actionIdentifier]);
            this.updateCallback()
        }

    }

    removeAction(key: KeyID, actionIndex: number): void {
        if(Array.isArray(key)) {
            this.data[this.selectedLayer]?.[key[0]]?.[key[1]].actions.splice(actionIndex, 1);
            this.updateCallback()
        }
    }

    getActions(key: KeyID): KeyConfig | undefined {
        // console.log(this.data[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions)
        if(Array.isArray(key)) {
            return this.data[this.selectedLayer]?.[key[0]]?.[key[1]]
        }
        return undefined
    }

    getLayerCount(): number {
        return this.data.length;        
    }

    getSelectedLayer(): number {
        return this.selectedLayer;
    }
    
    selectLayer(layer: number): void {
        this.selectedLayer = layer;
        this.updateCallback()
    }

    createLayer(): void {
        this.data.push([])

        for (let y = 0; y < 8; y++) {
            this.data[this.data.length - 1].push([])
            for(let x = 0; x < 8; x++) {
                this.data[this.data.length - 1][y].push({actions: [], effects: []})
            }
        }
    }

    exportData() {
        /*
        To export the Data you have to access the this.data value
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
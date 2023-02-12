import type { KeyID } from "$lib/types/KeyID";
import { actions } from "/src/components/actionbodies/ActionRegistry"
import type { Action, Effect, KeyConfig } from '$lib/types/Action';
import type { UniversalActionDesciptor, universalaActionDesciptorDevice } from '$lib/types/UAD';

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

    deleteLayer(layer: number): void {
        this.data.splice(layer, 1);
        if(this.getLayerCount() === 0) {
            this.createLayer();
        }
        if(this.selectedLayer >= this.getLayerCount()) {
            this.selectedLayer = this.getLayerCount() - 1;
        }
        this.updateCallback();
    }

    compressArray(array: any[], nested: bool = false): any[] { //Nest is for compressed array inside of compressed array
        var bitmap = 0;

        // Generate Bitmap, if the element is not empty, set the bit to 1
        for (let i = 0; i < array.length; i++) {
            if (array[i] != undefined && (!nested || !(array[i]?.[0] == 0))) { // Check if the element is [0] then that meas it is a previously compressed empty array
                bitmap |= 1 << i;
            }
        }

        // Remove Empty Elements
        var array = array.filter((value) => {
            return value != undefined && (!nested || !(value?.[0] == 0)); // Same as above
        })

        array = [bitmap].concat(array);

        return array
    }

    uploadToDevice() {
        console.log("Upload to Device")

        var uad: UniversalActionDesciptor = {
            uad_version: 0,
            action_list: [],
            effect_list: [],
            devices: []
        }

        //TODO: Data are hardcoded for now - Pending for dynamic device support
        var deviceData: universalaActionDesciptorDevice = {
            name: "Matrix",
            id: [0x0203, 0x1040],
            size: [8, 8],
            effects: [0],
            actions: []
        }

        // Fetch All Actions
        for (let x = 0; x < 8; x++) {
            deviceData.actions.push([])
            for (let y = 0; y < 8; y++) {
                deviceData.actions[x].push([])
                for (let layer = 0; layer < this.getLayerCount(); layer++) {
                    deviceData.actions[x][y].push([])
                    for (let action = 0; action < this.data[layer]?.[x]?.[y]?.actions.length; action++) {
                        var local_action = this.data[layer][x][y].actions[action];
                        
                        var local_action_identifier = local_action.constructor.identifier;

                        var local_action_data = local_action.export();
                        if (local_action_data === undefined) {
                            continue;
                        }

                        var action_index = uad.action_list.indexOf(local_action_identifier);

                        if(action_index === -1) {
                            uad.action_list.push(local_action_identifier);
                            action_index = uad.action_list.length - 1;
                        }

                        deviceData.actions[x][y][layer].push([action_index].concat(local_action_data))
                    }

                    if(deviceData.actions[x][y][layer].length === 0) {
                        deviceData.actions[x][y][layer] = undefined;
                    }
                }
                deviceData.actions[x][y] = this.compressArray(deviceData.actions[x][y]);
            }
            deviceData.actions[x] = this.compressArray(deviceData.actions[x], true);
        }
        deviceData.actions = this.compressArray(deviceData.actions, true);
        
        uad.devices.push(deviceData);

        console.log(uad);
    }
}
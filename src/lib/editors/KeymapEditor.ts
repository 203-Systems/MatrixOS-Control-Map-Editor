import type { KeyID } from "$lib/types/KeyID";
import { actions } from "/src/components/actionbodies/ActionRegistry"
import type { Action, Effect, KeyAction } from '$lib/types/Action';
import type { UniversalActionDesciptor, UniversalActionDesciptorDevice } from '$lib/types/UAD';
import * as cbor from 'cbor-web';

export class KeymapEditor {
    private data: KeyAction[][][] = []; //Layer, X, Y
    private selectedLayer: number = 0;
    private updateCallback:()=>void;
    
    constructor(updateCallbackFunc:()=>void) {
        this.updateCallback = updateCallbackFunc;
        
        // Create a default layer
        this.data.push([])
        for (let y = 0; y < 8; y++) {
            this.data[this.data.length - 1].push([])
            for(let x = 0; x < 8; x++) {
                this.data[this.data.length - 1][y].push({actions: [], effects: []})
            }
        }
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

    getActions(key: KeyID): KeyAction | undefined {
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

    createLayer(switchToNewLayer: boolean = true): void {
        this.data.push([])

        for (let y = 0; y < 8; y++) {
            this.data[this.data.length - 1].push([])
            for(let x = 0; x < 8; x++) {
                this.data[this.data.length - 1][y].push({actions: [], effects: []})
            }
        }

        if(switchToNewLayer) {
            this.selectedLayer = this.data.length - 1;
        }
        this.updateCallback()
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

    generateUAD() {
        var uad: UniversalActionDesciptor = {
            uad_version: 0,
            action_list: [],
            effect_list: [],
            devices: []
        }

        //TODO: Data are hardcoded for now - Pending for dynamic device support
        var deviceData: UniversalActionDesciptorDevice = {
            name: "Matrix",
            id: [0x0203, 0x1040],
            size: [8, 8],
            layers: this.getLayerCount(),
            effects: [],
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
        
        // Add Effects
        deviceData.effects.push(0)
        
        uad.devices.push(deviceData);

        return uad;
    }

    bitmapToArray(bitmap: number, length: number): number[] {
        var newArray: number[] = [];

        // For 1010101, generate [0,2,4,6]
        for (let i = 0; i < length; i++) {
            if (BigInt(bitmap) & (BigInt(1) << BigInt(i))) {
                newArray.push(i)
            }
        }

        return newArray;
    }

    loadUAD(uad: UniversalActionDesciptor)
    {  
        try {
            if (uad === undefined) {
                console.error("UAD is undefined")
                return;
            }

            while(this.getLayerCount() < uad.devices[0].layers){
                this.createLayer();
            }

            let actions_to_load = uad.devices[0].actions;

            // iteratur through the array
            let x_map = this.bitmapToArray(actions_to_load[0], uad.devices[0].size[0]);
            for (var [x_index, x] of x_map.entries()) 
            {
                // console.log(`X: ${x}`)
                let y_map = this.bitmapToArray(actions_to_load[x_index + 1][0], uad.devices[0].size[1]);
                for (var [y_index, y] of y_map.entries()) 
                {
                    // console.log(`X: ${x} Y: ${y}`)
                    let layer_map = this.bitmapToArray(actions_to_load[x_index + 1][y_index + 1][0], uad.devices[0].layers);
                    for (var [layer_index, layer] of layer_map.entries())
                    {
                        // console.log(`X: ${x} Y: ${y} Layer: ${layer}`)
                        for(var action of actions_to_load[x_index + 1][y_index + 1][layer_index + 1]) {
                            var action_type = uad.action_list[action[0]];

                            // Create new action
                            this.data[layer]?.[x]?.[y].actions.push(new actions[action_type]);
                            //Import data into action
                            this.data[layer]?.[x]?.[y].actions[this.data[layer]?.[x]?.[y].actions.length - 1].import(action.slice(1));
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Failed to load UAD");
            console.error(error);
        }

        this.updateCallback();
        
    }


    importUADA() {
        // Open File Dialog
        var input = document.createElement('input');

        input.type = 'file';
        input.onchange = (e) => {
            var file = (e.target as HTMLInputElement).files[0];
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');
            reader.onload = readerEvent => {
                var content = (readerEvent.target as any).result; // this is the content!
                var uad: UniversalActionDesciptor = JSON.parse(content);
                this.loadUAD(uad);
            }
        }
        input.click();
    }

    exportUADA()
    {
        console.log("Export UADA")

        let uad = this.generateUAD();

        // Download JSON
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(uad));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "keymap.uada");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    uploadToDevice() {
        console.log("Upload to Device")

        // Check if device is connected

        let uad = this.generateUAD();

        // Convert to CBOR
        let uad_encoded = cbor.encode(uad);

        // Download binary file
        console.log(uad_encoded)
        var blob = new Blob([uad_encoded], {
            type: "application/octet-stream"
          });
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", window.URL.createObjectURL(blob));
        downloadAnchorNode.setAttribute("download", "keymap.uad");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    importFromDevice() {
        console.log("Import From Device")

        // Get UAD from Device
        // let uad = 

        this.loadUAD(uad);
    }
}
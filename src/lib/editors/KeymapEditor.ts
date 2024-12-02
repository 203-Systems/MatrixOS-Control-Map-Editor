import type { KeyID } from "$lib/types/KeyID";
import { actions, effects } from "/src/components/actionbodies/ActionRegistry"
import type { Action, Effect, KeyAction } from '$lib/types/Action';
import type { UniversalActionDesciptor, UniversalActionDesciptorDevice } from '$lib/types/UAD';
import type { ActionType } from '$lib/types/ActionType';
import * as cbor from 'cbor-web';
import { HIDCommand, HIDWrite, HIDResponse} from "$lib/types/HIDProtocol";
import type { DeviceDescriptor, UADStatus } from "$lib/types/HIDProtocol";
import { Connect } from "carbon-icons-svelte";

const DEVICE_TIMEOUT_DURATION = 1000;

export class KeymapEditor {
    private data: KeyAction[][][] = []; //Layer, X, Y
    private selectedLayer: number = 0;
    private updateCallback: () => void;
    private device: HIDDevice | undefined;
    private deviceDesc: DeviceDescriptor | undefined;

    constructor(updateCallbackFunc: () => void) {
        this.updateCallback = updateCallbackFunc;

        this.clear()
    }

    clear() {
        // Reset Data
        this.data = [];
        this.selectedLayer = 0;
        // Create a default layer
        this.data.push([])
        for (let y = 0; y < 8; y++) {
            this.data[this.data.length - 1].push([])
            for (let x = 0; x < 8; x++) {
                this.data[this.data.length - 1][y].push({ actions: [], effects: [] })
            }
        }
    }

    addAction(key: KeyID, type: ActionType, actionIdentifier: string): void {
        if (Array.isArray(key)) {
            if (type === "action") {
                this.data[this.selectedLayer]?.[key[0]]?.[key[1]].actions.push(new actions[actionIdentifier]);
            } else if (type === "effect") {
                this.data[this.selectedLayer]?.[key[0]]?.[key[1]].effects.push(new effects[actionIdentifier]);
            }
            this.updateCallback()
        }
    }

    removeAction(key: KeyID, type: ActionType, actionIndex: number): void {
        if (Array.isArray(key)) {
            if (type === "action") {
                this.data[this.selectedLayer]?.[key[0]]?.[key[1]].actions.splice(actionIndex, 1);
            } else if (type === "effect") {
                this.data[this.selectedLayer]?.[key[0]]?.[key[1]].effects.splice(actionIndex, 1);
            }
            this.updateCallback()
        }
    }

    getActions(key: KeyID): KeyAction | undefined {
        // console.log(this.data[this.selectedLayer].grid[this.getNormalIndex(keyIndex)].actions)
        if (Array.isArray(key)) {
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
            for (let x = 0; x < 8; x++) {
                this.data[this.data.length - 1][y].push({ actions: [], effects: [] })
            }
        }

        if (switchToNewLayer) {
            this.selectedLayer = this.data.length - 1;
        }
        this.updateCallback()
    }

    deleteLayer(layer: number): void {
        this.data.splice(layer, 1);
        if (this.getLayerCount() === 0) {
            this.createLayer();
        }
        if (this.selectedLayer >= this.getLayerCount()) {
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

                        if (action_index === -1) {
                            uad.action_list.push(local_action_identifier);
                            action_index = uad.action_list.length - 1;
                        }

                        deviceData.actions[x][y][layer].push([action_index].concat(local_action_data))
                    }

                    if (deviceData.actions[x][y][layer].length === 0) {
                        deviceData.actions[x][y][layer] = undefined;
                    }
                }
                deviceData.actions[x][y] = this.compressArray(deviceData.actions[x][y]);
            }
            deviceData.actions[x] = this.compressArray(deviceData.actions[x], true);
        }
        deviceData.actions = this.compressArray(deviceData.actions, true);

        // Add Effects
        for (let layer = 0; layer < this.getLayerCount(); layer++) {
            deviceData.effects.push([]);
            for (let x = 0; x < 8; x++) {
                deviceData.effects[layer].push([]);
                for (let y = 0; y < 8; y++) {
                    deviceData.effects[layer][x].push([]);

                    if (!this.data[layer]?.[x]?.[y]?.effects) {
                        continue;
                    }

                    for (let effect = 0; effect < this.data[layer][x][y].effects.length; effect++) {
                        var local_effect = this.data[layer][x][y].effects[effect];
                        var local_effect_identifier = local_effect.constructor.identifier;
                        var local_effect_data = local_effect.export();

                        if (local_effect_data === undefined) {
                            continue;
                        }

                        var effect_index = uad.effect_list.indexOf(local_effect_identifier);

                        if (effect_index === -1) {
                            uad.effect_list.push(local_effect_identifier);
                            effect_index = uad.effect_list.length - 1;
                        }

                        deviceData.effects[layer][x][y].push([effect_index].concat(local_effect_data));
                    }

                    if (deviceData.effects[layer][x][y].length === 0) {
                        deviceData.effects[layer][x][y] = undefined;
                    }
                }
                deviceData.effects[layer][x] = this.compressArray(deviceData.effects[layer][x]);
            }
            deviceData.effects[layer] = this.compressArray(deviceData.effects[layer], true);
        }
        deviceData.effects = this.compressArray(deviceData.effects, true);

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

    loadUAD(uad: UniversalActionDesciptor) {
        this.clear();
        try {
            if (uad === undefined) {
                console.error("UAD is undefined")
                return;
            }

            while (this.getLayerCount() < uad.devices[0].layers) {
                this.createLayer();
            }

            let actions_to_load = uad.devices[0].actions;

            // iteratur through the array to load actions
            let x_map = this.bitmapToArray(Number(actions_to_load[0]), uad.devices[0].size[0]);
            for (var [x_index, x] of x_map.entries()) {
                // console.log(`X: ${x}`)
                let y_map = this.bitmapToArray(Number(actions_to_load[x_index + 1][0]), uad.devices[0].size[1]);
                for (var [y_index, y] of y_map.entries()) {
                    // console.log(`X: ${x} Y: ${y}`)
                    let layer_map = this.bitmapToArray(Number(actions_to_load[x_index + 1][y_index + 1][0]), uad.devices[0].layers);
                    for (var [layer_index, layer] of layer_map.entries()) {
                        // console.log(`X: ${x} Y: ${y} Layer: ${layer}`)
                        for (var action of actions_to_load[x_index + 1][y_index + 1][layer_index + 1]) {
                            var action_type = uad.action_list[action[0]];

                            // Create new action
                            this.data[layer]?.[x]?.[y].actions.push(new actions[action_type]);
                            //Import data into action
                            this.data[layer]?.[x]?.[y].actions[this.data[layer]?.[x]?.[y].actions.length - 1].import(action.slice(1));
                        }
                    }
                }
            }

            let effects_to_load = uad.devices[0].effects;

            // iterate through the array to load effects
            let layer_map = this.bitmapToArray(Number(effects_to_load[0]), uad.devices[0].layers);
            for (var [layer_index, layer] of layer_map.entries()) {
                let x_map = this.bitmapToArray(Number(effects_to_load[layer_index + 1][0]), uad.devices[0].size[0]);
                for (var [x_index, x] of x_map.entries()) {
                    // console.log(`Layer: ${layer} X: ${x}`)
                    let y_map = this.bitmapToArray(Number(effects_to_load[layer_index + 1][x_index + 1][0]), uad.devices[0].size[1]);
                    for (var [y_index, y] of y_map.entries()) {
                        // console.log(`Layer: ${layer} X: ${x} Y: ${y}`)
                        for (var effect of effects_to_load[layer_index + 1][x_index + 1][y_index + 1]) {
                            var effect_type = uad.effect_list[effect[0]];

                            // Create new effect
                            this.data[layer]?.[x]?.[y].effects.push(new effects[effect_type]);
                            // Import data into effect
                            this.data[layer]?.[x]?.[y].effects[this.data[layer]?.[x]?.[y].effects.length - 1].import(effect.slice(1));
                        }
                    }
                }
            }

        } catch (error) {
            console.error("Failed to load UAD");
            console.error(error);
            this.clear();
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
            reader.readAsText(file, 'UTF-8');
            reader.onload = readerEvent => {
                var content = (readerEvent.target as any).result; // this is the content!
                var uad: UniversalActionDesciptor = JSON.parse(content);
                this.loadUAD(uad);
            }
        }
        input.click();
    }

    exportUADA() {
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

    async SendReportToDevice(device: HIDDevice, payload: Uint8Array, retry: number = 3): Promise<boolean> {
        if (!device || !device.opened) {
            console.log("Device is not connected or opened");
            return false; // Indicate failure
        }
    
        console.log("Sending Report to Device");
    
        while (retry > 0) {
            try {
                await device.sendReport(0xFF, payload);
                console.log("Report sent successfully");
                return true; // Indicate success
            } catch (error) {
                console.error(`Failed to send report, attempts left: ${retry - 1}`, error);
                retry--;
            }
        }
    
        console.log("Failed to send report after retries");
        return false; // Indicate failure after all retries
    }

    async RequestReportToDevice(device: HIDDevice, payload: Uint8Array, retry: number = 3): Promise<Uint8Array> {
        // Ensure SendReportToDevice is successful before proceeding
        const sendSuccess = await this.SendReportToDevice(device, payload, retry);
        if (!sendSuccess) {
            throw new Error('Failed to send report to device');
        }
    
        const TIMEOUT_DURATION = 1000;
    
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                device.removeEventListener('inputreport', onInputReport);
                reject(new Error('Timeout waiting for device report'));
            }, TIMEOUT_DURATION);
    
            function onInputReport(event: HIDInputReportEvent) {
                console.log("Received Input Report");
                clearTimeout(timeout); // Clear the timeout to avoid false timeout error
                device.removeEventListener('inputreport', onInputReport); // Clean up event listener
                resolve(new Uint8Array(event.data.buffer, event.data.byteOffset, event.data.byteLength));
            }
    
            // Add the listener for input reports
            device.addEventListener('inputreport', onInputReport);
        });
    }
    

    

    async connect() {
        // Check if HID is supported
        if (!("hid" in navigator)) {
            console.log("HID is not supported");
            return;
        }

        // Check if existing connect is open. If so close
        if (this.device !== undefined) {
            this.device.close();
            this.device = undefined;
        }

        // Get valid HID device
        try {
            const devices = await navigator.hid.requestDevice({
                filters: [
                    {
                        vendorId: 0x0203
                    }
                ],
            });
            this.device = devices[0];
        } catch (error) {
            console.log("No device was selected.");
            return;
        }

        // Remove device if disconnected
        navigator.hid.addEventListener("disconnect", (event) => {
            if (event.device === this.device) {
                console.log("Device disconnected");
                this.device = undefined;
            }
        });

        // Log device name
        if (this.device === undefined) {
            console.log("No device was selected.");
        } else {
            console.log(`HID: ${this.device.productName}`);
        }

        // Open device
        if (!this.device.opened) {
            await this.device.open();
        }

        // let report;
        // Check if MatrixOS device is in Custom keymap mode
        // try {
            // for (let i = 3; i > 0; i--) {
            //     console.log(`Checking if Matrix OS device is in custom keymap mode. ${i} attempts remaining`);
            //     report = await this.device.receiveFeatureReport(0);

            //     if (report.getUint32(0) === 0x2ccba780) { // "203 Electronics-Custom Keymap" App ID
            //         console.log("Matrix OS device is in custom keymap mode");
            //     }
            //     else if (i > 1) // Still got attempts left
            //     {
            //         console.log(`Matrix OS device is not in custom keymap mode. Attempting to put device into custom keymap mode. ${i} attempts remaining`);
            //         this.device.sendFeatureReport(0, new Uint32Array([0x2ccba780]));
            //         await new Promise(r => setTimeout(r, 1000));
            //         continue
            //     }
            //     break;
            // }
        // } catch (error) {
        //     console.log("Failed to get Matrix OS device into custom keymap mode");
        //     return;
        // }


        // Get Device Descriptor
        // TODO Check if version is supported
        this.deviceDesc = await this.getDeviceDescriptor(this.device);

        if (this.deviceDesc === undefined) {
            console.log("Failed to get device descriptor");
            alert("Failed to get device descriptor");
            return;
        } else {
            console.log("Device Descriptor fetched");
            console.log(this.deviceDesc);
        }
    }

    getDevice(): Promise<HIDDevice | undefined> {
        return new Promise(async (resolve, reject) => {
            try {
                const filters = [
                    {
                        vendorId: 0x0203
                    }
                ];
                
                const [device] = await navigator.hid.requestDevice({ filters });
                resolve(device);
            } catch (error) {
                reject(error);
            }
        });
    }

    // async waitForDeviceReport(device: HIDDevice) {
    //     const TIMEOUT_DURATION = 1000;
    //     return new Promise((resolve, reject) => {
    //         const timeout = setTimeout(() => {
    //             device.removeEventListener('inputreport', onInputReport);
    //             reject(new Error('Timeout waiting for device report'));
    //         }, TIMEOUT_DURATION);
    
    //         function onInputReport(event: HIDInputReportEvent) {
    //             console.log("Received Input Report");
    //             console.log(event);
    //             clearTimeout(timeout);
    //             device.removeEventListener('inputreport', onInputReport);
    //             resolve(new Uint8Array(event.data.buffer, event.data.byteOffset, event.data.byteLength));
    //         }
    
    //         device.addEventListener('inputreport', onInputReport);
    //     });
    // }
    
    async getDeviceDescriptor(device: HIDDevice)
    {   
        if(!device || !device.opened) {return null;}

        console.log("Fetching Device Descriptor");

        var command = new Uint8Array([HIDCommand.DEVICE_DESCRIPTOR]);

        var data = await this.RequestReportToDevice(device, command);

        console.log(data);
        
        if(data === undefined) {return undefined;}
        if(data[0] !== HIDCommand.DEVICE_DESCRIPTOR + HIDResponse) {return undefined;}

        var deviceDesc: DeviceDescriptor = {
            uadVersion: [data[1], data[2]],
            vendorId: (data[3] << 16) | (data[4] << 8) | data[5],
            deviceId: (data[6] << 16) | (data[7] << 8) | data[8],
            xSize: data[9],
            ySize: data[10],
            maxLayers: data[11],
            maxUADSize: (data[12] << 24) | (data[13] << 16) | (data[14] << 8) | data[15],
        }

        return deviceDesc;
    }

    async getDeviceUADStatus(device: HIDDevice)
    {   
        console.log("Fetching Device Descriptor");

        var command = new Uint8Array([HIDCommand.UAD_STATUS]);

        var data = await this.RequestReportToDevice(device, command);

        console.log(data);
        
        if(data === undefined) {return undefined;}
        if(data[0] !== HIDCommand.UAD_STATUS +  HIDResponse) {return undefined;}

        var deviceUADStatus : UADStatus = {
            loaded: data[1] === 1,
            uadSize: (data[2] << 24) | (data[3] << 16) | (data[4] << 8) | data[5],
            layerCount: data[6],
            layerEnabled: data[7] << 8 | data[8],
            layerPassthrough: data[9] << 8 | data[10]
        }

        return deviceUADStatus;
    }

    async getDeviceUADData(device: HIDDevice, section: number)
    {   
        console.log("Fetching Device Descriptor");

        var command = new Uint8Array([HIDCommand.UAD_DATA, (section >> 8) & 0xFF, section & 0xFF]);

        var data = await this.RequestReportToDevice(device, command);

        console.log(data);
        
        if(data === undefined) {return undefined;}
        if(data[0] !== HIDCommand.UAD_DATA + HIDResponse) {return undefined;}

        var deviceUADData = {
            section: data[1] << 8 | data[2],
            size: data[3],
            data: data.slice(4, 4 + data[3])
        }

        if(deviceUADData.section !== section) {return undefined;}

        return deviceUADData;
    }

    async uploadToDevice() {
        console.log("Upload to Device")

        if (this.device === undefined || !this.device.opened || this.deviceDesc === undefined) {
            await this.connect();
        }
        
        // Generate UAD
        let uad = this.generateUAD();

        let uad_encoded = cbor.encode(uad);
        

        // Tell device to expect new UAD
        var command = new Uint8Array([
            HIDCommand.UAD_STATUS | HIDWrite, 
            0, 
            (uad_encoded.length >> 24) & 0xFF, 
            (uad_encoded.length >> 16) & 0xFF, 
            (uad_encoded.length >> 8) & 0xFF,  
            uad_encoded.length & 0xFF
        ]);

        console.log("Command");
        console.log(command);

        var reponse = await this.RequestReportToDevice(this.device, command);

        if(reponse[0] !== HIDCommand.ACK || reponse[1] !== HIDCommand.UAD_STATUS + HIDResponse) {
            throw new Error("Failed to send UAD Status");
            return;
        }

        // Send UAD Data
        const totalSections = Math.ceil(uad_encoded.length / 8);
        for (let section = 0; section < totalSections; section++) {
            for (let retry = 0; retry < 3; retry++) {
                        const start = section * 8;
                        const end = Math.min(uad_encoded.length, (section + 1) * 8);
                        const data = uad_encoded.slice(start, end);
                        var command = new Uint8Array([HIDCommand.UAD_DATA | HIDWrite, (section >> 8) & 0xFF, section & 0xFF, data.length].concat(Array.from(data)));

                        var reponse = await this.RequestReportToDevice(this.device, command);

                       if(reponse[0] === HIDCommand.ACK && reponse[1] === HIDCommand.UAD_DATA + HIDResponse && reponse[2] === (section & 0xFF)) {
                            console.log(`Sent UAD Data section ${section + 1} / ${totalSections}`);
                            continue;
                        } else {
                            console.log(`Failed to send UAD Data section ${section + 1} / ${totalSections}`);
                            throw new Error("Failed to send UAD Data");
                        }
            }
        }

        // Tell device to save UAD
        var command = new Uint8Array([HIDCommand.UAD_SAVE | HIDWrite]);

        var reponse = await this.RequestReportToDevice(this.device, command);

        if(reponse[0] !== HIDCommand.ACK || reponse[1] !== HIDCommand.UAD_SAVE + HIDWrite) {
            throw new Error("Device failed to save UAD");
            return;
        }

        console.log("UAD Saved Successfully");

        // Tell device to load UAD
        var command = new Uint8Array([HIDCommand.UAD_LOAD | HIDWrite]);

        var reponse = await this.RequestReportToDevice(this.device, command);

        if(reponse[0] !== HIDCommand.ACK || reponse[1] !== HIDCommand.UAD_LOAD + HIDWrite) {
            throw new Error("Device failed to load UAD");
            return;
        }
    }




    // uploadToDevice() {
    //     console.log("Upload to Device")

    //     // Check if device is connected

    //     let uad = this.generateUAD();

    //     // Convert to CBOR
    //     let uad_encoded = cbor.encode(uad);

    //     // Print to console
    //     let string = `static const uint8_t sample_uad[${uad_encoded.length}]  = {\n`

    //     for (let i = 0; i < uad_encoded.length; i++) {
    //         string += `0x${uad_encoded[i].toString(16).padStart(2, "0")}, `
    //         if (i % 16 == 15) {
    //             string += "\n"
    //         }
    //     }

    //     string = string.slice(0, -2);
    //     string += "\n};"

    //     console.log(string)

    //     // Download binary file
    //     console.log(uad_encoded)
    //     var blob = new Blob([uad_encoded], {
    //         type: "application/octet-stream"
    //     });
    //     var downloadAnchorNode = document.createElement('a');
    //     downloadAnchorNode.setAttribute("href", window.URL.createObjectURL(blob));
    //     downloadAnchorNode.setAttribute("download", "keymap.uad");
    //     document.body.appendChild(downloadAnchorNode); // required for firefox
    //     downloadAnchorNode.click();
    //     downloadAnchorNode.remove();
    // }

    async importFromDevice() {
        console.log("Import From Device")
        
        if (this.device === undefined || !this.device.opened || this.deviceDesc === undefined) {
            await this.connect();
        }

        let deviceUADStatus = await this.getDeviceUADStatus(this.device);

        if (deviceUADStatus === undefined) {
            console.log("Failed to get device UAD Status");
            alert("Failed to get device UAD Status");
            return;
        } else {
            console.log("Device UAD Status fetched");
            console.log(deviceUADStatus);
        }

        if(!deviceUADStatus.loaded) {
            alert("Device does not have a keymap loaded");
            console.log("Device UAD is not loaded");
            return;
        }

        const uad_encoded = new Uint8Array(deviceUADStatus?.uadSize);

        const totalSections = Math.ceil(deviceUADStatus?.uadSize / 8);
        
        for (let section = 0; section < totalSections; section++) {
            for (let retry = 0; retry < 3; retry++) {
                try {
                    const deviceUADData = await this.getDeviceUADData(this.device, section);
        
                    if (deviceUADData === undefined) {
                        console.log(`Failed to get device UAD Data section ${section + 1} / ${totalSections}`);
                        return;
                    } else {
                        console.log(`Device UAD Data fetched for section ${section + 1} / ${totalSections}`);
                    }
        
                    if (deviceUADData.section === section) {
                        // Ensure data is a Uint8Array and add it to the correct position in uad_encoded
                        const data = new Uint8Array(deviceUADData.data); // Convert to Uint8Array if needed
                        const start = section * 8;
                        uad_encoded.set(data, start);
                        break;
                    }
                } catch (error) {
                    console.log(`Error fetching UAD Data for section ${section + 1} / ${totalSections}:`, error);
                }
            }
        }
        var uad = cbor.decode(uad_encoded);

        this.loadUAD(uad);

        function getLeftMostBitPosition(value) {
            let position = -1;
            while (value > 0) {
                position++;
                value >>= 1; // Right shift the value
            }
            return position;
        }

        var layer = getLeftMostBitPosition(deviceUADStatus.layerEnabled);
        this.selectLayer(layer);
    }
}
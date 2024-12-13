<script lang="ts">
    import OverflowMenuHorizontal from "carbon-icons-svelte/lib/OverflowMenuHorizontal.svelte";
    import Matrix from "../components/Devices/Matrix.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import Popup from "../components/common/Popup.svelte";

    import LayerSelector from "../components/LayerSelector.svelte";
    import { KeymapEditor, EditorState} from "$lib/editors/KeymapEditor";
    import type { ActionType } from "$lib/types/ActionType";
    import type { KeyID } from "$lib/types/KeyID";

    import { Usb, DocumentImport, DocumentExport, Upload, Download, Settings} from "carbon-icons-svelte";
    import { onMount } from "svelte";

    let updateCount: number = 0; //Cause all components to update
    let selectedKey:KeyID = undefined;
    let editorBackend = new KeymapEditor(update)

    let editorState:EditorState = EditorState.DISCONNECTED;
    let editorStateViewer:boolean = false;
    let editorStateViewerCloseable:boolean = true;
    let deviceTransferProgress:number = 0;

    function update(): void {
        updateCount += 1;
        editorState = editorBackend.editorState;
        editorStateViewer = editorBackend.editorStateViewer;
        editorStateViewerCloseable = editorBackend.editorStateViewerCloseable;
        deviceTransferProgress = editorBackend.deviceTransferProgress;
    }

    $: editorBackend.editorStateViewer = editorStateViewer;

    $: {
        selectedKey; // Mentioning selectedKey in here makes this reactive function run on every change of it
        update();
    }

    function addAction(actionType:ActionType, actionIdentifier: string): void {
        editorBackend.addAction(selectedKey, actionType, actionIdentifier);
    }

    function removeAction(actionType:ActionType, actionIndex: number): void {
        editorBackend.removeAction(selectedKey, actionType, actionIndex)
    }

    onMount(() => {
        update();
    })

//     export enum editorState {
//     USER_SELECTING,
//     CHECKING_IN_APP,
//     FETCHING_DEVICE_DESCRIPTOR,
//     FETCHING_UAD_STATUS,
//     SENDING_NEW_UAD_META,
//     IMPORTING_FROM_DEVICE,
//     UPLOAD_TO_DEVICE,
//     DEVICE_SAVING_UAD,
//     DEVICE_LOADING_UAD,

//     BROWSER_NOT_SUPPORTED,  
//     NO_DEVICE_SELECTED,
//     DEVICE_NOT_IN_APP,
//     FETCHING_DEVICE_DESCRIPTOR_ERROR,
//     FETCHING_UAD_STATUS_ERROR,
//     SENDING_NEW_UAD_META_ERROR,
//     IMPORT_ERROR,
//     UPLOAD_ERROR,
//     DEVICE_SAVING_UAD_ERROR,
//     DEVICE_LOADING_UAD_ERROR,
// }

    let editorStatePopupTitle = undefined;

    const editorStatePopupDesc = {
        [EditorState.DISCONNECTED]: "Device Disconnected",
        [EditorState.CONNECTED]: "Device Connected",
        
        [EditorState.USER_SELECTING_DEVICE]: "Please Select a device",
        [EditorState.CHECKING_IN_APP]: "Checking if the device is in the app",
        [EditorState.FETCHING_DEVICE_DESCRIPTOR]: "Fetching device descriptor",
        [EditorState.FETCHING_UAD_STATUS]: "Fetching control map status",
        [EditorState.SENDING_NEW_UAD_META]: "Sending new control map info",
        [EditorState.IMPORTING_FROM_DEVICE]: "Importing control map from device",
        [EditorState.UPLOADING_TO_DEVICE]: "Uploading control map to device",
        [EditorState.DEVICE_SAVING_UAD]: "Saving UAD to device",
        [EditorState.DEVICE_LOADING_UAD]: "Loading UAD from device",

        [EditorState.UPLOAD_TO_DEVICE_COMPLETED]: "Upload to device completed",
        [EditorState.IMPORT_FROM_DEVICE_COMPLETED]: "Import from device completed",

        [EditorState.GENERATING_UAD]: "Generating Control Map",
        [EditorState.PARSING_UAD]: "Error parsing control map",
        
        [EditorState.BROWSER_NOT_SUPPORTED]: "Browser not supported",
        [EditorState.NO_DEVICE_SELECTED]: "No device selected",
        [EditorState.DEVICE_NOT_IN_APP]: "Device not in app",
        [EditorState.FETCHING_DEVICE_DESCRIPTOR_ERROR]: "Failed fetching device descriptor",
        [EditorState.FETCHING_UAD_STATUS_ERROR]: "Failed fetching control map info",
        [EditorState.DEVICE_UAD_NOT_LOADED]: "Device doesn't have a loaded control map",
        [EditorState.SENDING_NEW_UAD_META_ERROR]: "Failed sending new control map info",
        [EditorState.IMPORT_ERROR]: "Failed importing from device",
        [EditorState.UPLOAD_ERROR]: "Failed uploading to device",
        [EditorState.DEVICE_SAVING_UAD_ERROR]: "Device failed to save control map",
        [EditorState.DEVICE_LOADING_UAD_ERROR]: "Device failed to load control map",

        [EditorState.GENERATING_UAD_ERROR]: "Failed generating control map",
        [EditorState.PARSING_UAD_ERROR]: "Failed parsing control map",
    }
</script>

<svelte:head>
    <title>Matrix OS Keymap Editor</title>
</svelte:head>

<main>
    <div class="main-content">
        <div class="header">
            <div class="logo">
                <img src="Matrix OS.svg" class="logo">
            </div>

            <div class="title">
                <span>CONTROL MAP EDITOR</span>
            </div>

            <div class="controls">
                <!-- <div class="control" title="Connect to Device" on:click={() => {editorStatePopupTitle = "Connect to Device"; editorBackend.connectToDevice()} }>
                    <Usb size={24}/>
                    <span class="control-text">Connect to Device</span>
                </div> -->
                <div class="control" title="Import from a file" on:click={() => {editorStatePopupTitle = "Import from File"; editorBackend.importUADA()} }>
                    <DocumentImport size={24}/>
                    <span class="control-text">Import from File</span>
                </div>
                <div class="control" title="Export to a file" on:click={() => {editorStatePopupTitle = "Export to File"; editorBackend.exportUADA()} }>
                    <DocumentExport size={24}/>
                    <span class="control-text">Export to File</span>
                </div>
                <div class="control" title="Import from Device" on:click={() => {editorStatePopupTitle = "Import from Device"; editorBackend.importFromDevice()} }>
                    <Download size={24}/>
                    <span class="control-text">Import from Device</span>
                </div>
                <div class="control" title="Upload to Device" on:click={() => {editorStatePopupTitle = "Upload to Device"; editorBackend.uploadToDevice()} }>
                    <Upload size={24}/>
                    <span class="control-text">Upload to Device</span>
                </div>
                <div class="control">
                    <Settings size={24}/>
                    <span class="control-text">Settings</span>
                </div>
            </div>
        </div>

        <div class="device-container">
            <div class="device">
                <Matrix
                        bind:updateCount={updateCount}
                        bind:selectedKey={selectedKey}
                        bind:editorBackend={editorBackend}
                />
            </div>
        </div>
        <div class="layer-selector">
            <LayerSelector
                bind:updateCount={updateCount}
                bind:editorBackend={editorBackend}
            />
        </div>
    </div>

    <div class="sidebar-container">
        <Sidebar
                bind:updateCount={updateCount}
                bind:selectedKey={selectedKey}
                bind:editorBackend={editorBackend}
                on:addAction={e => addAction(e.detail.type, e.detail.actionIdentifier)}
                on:removeAction={e => removeAction(e.detail.type, e.detail.index)}
        />
    </div>

    <Popup title={editorStatePopupTitle} bind:show={editorStateViewer} bind:closeable={editorStateViewerCloseable}>
        <div class="editor-state-popup">
            <span>{editorStatePopupDesc[editorState]}</span>
            {#if editorState == EditorState.UPLOADING_TO_DEVICE || editorState == EditorState.IMPORTING_FROM_DEVICE}
                <progress max="100" value={deviceTransferProgress * 100}></progress>
            {/if}
            {#if editorStateViewerCloseable}
                <button on:click={() => editorStateViewer = false}>Close</button>
            {/if}
        </div>
    </Popup>
</main>

<style lang="scss">
    main {
        display: grid;
        grid-template-columns: 1fr 335px;

        width: 100vw;
        height: 100vh;

        background-color: #eff0f3;
    }

    .main-content {
        display: grid;
        grid-template-rows: 75px 1fr;

        .header {
            display: grid;
            grid-template-columns: 1fr max-content 1fr;
            grid-template-rows: 100px;

            .logo {
                img {
                    display: flex;
                    justify-content: center;
                    align-items: center; 

                    height: 100%;
                    padding: 34px;
                    box-sizing: border-box;
                }
            }

            .title {
                display: flex;
                justify-content: center;
                align-items: center;

                font-family: Inter, sans-serif;
                font-weight: 400;
                letter-spacing: 0.2rem;
                font-size: 2.2rem;
                padding-top: 3px;
            }
            .controls {
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 18px;
    gap: 12px; /* Increased gap for better spacing */

    .control {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0px;

        height: 50px;
        min-width: 50px; /* Ensure uniform circular shape */
        padding: 0 12px; /* Add horizontal padding for text */
        border-radius: 25px; /* Rounded edges for pill shape */
        
        background-color: black;
        color: white;

        cursor: pointer;
        transition: background-color 0.2s ease, max-width 0.3s ease;
        filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));
        box-sizing: border-box; /* Ensure padding doesn't affect size */

        &:hover {
            background-color: #404040;
        }

        &:active {
            background-color: #404040;
            scale: 0.95;
        }

        svg {
            width: 24px;
            height: 24px;
        }

        span.control-text {
            font-family: Inter, sans-serif;
            font-size: 1rem;
            white-space: nowrap;
            opacity: 1; /* Initially hidden */
            max-width: 0; /* Collapse text */
            overflow: hidden; /* Hide overflowing text */
            direction: rtl; /* Set text direction to right-to-left */
            text-align: left; /* Align the text back to the left */
            text-overflow: ellipsis; /* Optionally add ellipsis for overflow */
            transition: max-width 0.3s ease, padding-left 0.3s ease; /* Animate text expansion */
            padding-left: 0px; /* Add left padding for text */
        }

        &:hover span.control-text {
            padding-left: 8px; /* Expand the text container */
            max-width: 200px; /* Expand the text container */
        }
    }
}

        }

        .device-container {
            display: flex;
            justify-content: center;
            align-items: center;

            gap: 4rem;

            .device {
                width: 600px;

                aspect-ratio: 1 / 1;
            }

            flex-direction: column;

            width: calc(100vw - 335px);
        }

        .layer-selector {
            padding-bottom: 30px;
        }
    }

    .sidebar-container {
        height: 100vh;
    }

    .popup-error {
        filter: drop-shadow(0 0 12px rgba(255, 0, 0, 0.25));
        border: 1px solid red;
    }

    .editor-state-popup {
        width: 100%;
        min-width: 500px;
        height: 100%;
        min-height: 200px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Align items at the top initially */
        align-items: center;

        margin-top: 1rem;

        /* Ensure content fills space except for the button */
        > :not(button) {
            flex-grow: 1; /* Allow content to expand */
            display: flex; /* Enable flex for child spacing if needed */
            justify-content: center; /* Center content horizontally */
            align-items: center; /* Center content vertically */
            width: 100%; /* Ensure content spans full width */
        }

        button {
            margin-top: auto; /* Push the button to the bottom */
            width: 80px;
            height: 40px;

            display: flex;
            justify-content: center;
            align-items: center;

            font-family: Inter, sans-serif;
            font-size: 1.2rem;

            box-sizing: border-box;
            border: 1px solid gray;
            border-radius: 4px;

            cursor: pointer;

            overflow-wrap: anywhere;
            text-align: center;

            &:hover {
                background-color: #ececec;
            }
        }

        span {
            font-family: Inter, sans-serif;
            font-size: 1.3rem;
        }

        progress {
            width: 100%;
        }
    }


</style>
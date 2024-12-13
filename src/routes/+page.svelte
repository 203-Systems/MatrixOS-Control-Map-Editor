<script lang="ts">
    import OverflowMenuHorizontal from "carbon-icons-svelte/lib/OverflowMenuHorizontal.svelte";
    import Matrix from "../components/Devices/Matrix.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import Popup from "../components/common/Popup.svelte";
    import Dropdown from "../components/common/Dropdown.svelte";

    import LayerSelector from "../components/LayerSelector.svelte";
    import { KeymapEditor, EditorState} from "$lib/editors/KeymapEditor";
    import type { ActionType } from "$lib/types/ActionType";
    import type { KeyID } from "$lib/types/KeyID";

    import { Usb, DocumentImport, DocumentExport, Upload, Download, Settings} from "carbon-icons-svelte";
    import { onMount } from "svelte";

    import {t, locale, locales} from "$lib/translations";

    import {browser} from "$app/environment";

    let updateCount: number = 0; //Cause all components to update
    let selectedKey:KeyID = undefined;
    let editorBackend = new KeymapEditor(update)

    let editorState:EditorState = EditorState.DISCONNECTED;
    let editorStateViewer:boolean = false;
    let editorStateViewerCloseable:boolean = true;
    let deviceTransferProgress:number = 0;

    let showSetting:boolean = false;

    let settings = {
        language: "en"
    };

    let settings_loaded = false;

    $: if (browser && settings_loaded) {
        console.log("Saving setting");
        localStorage.setItem("settings", JSON.stringify(settings));
    }

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

    let editorStatePopupTitle = undefined;

    const editorStatePopupDesc = {
        [EditorState.DISCONNECTED]: $t('editor_state.disconnected'),
        [EditorState.CONNECTED]: $t('editor_state.connected'),
        
        [EditorState.USER_SELECTING_DEVICE]: $t('editor_state.user_selecting_device'),
        [EditorState.CHECKING_IN_APP]: $t('editor_state.checking_in_app'),
        [EditorState.FETCHING_DEVICE_DESCRIPTOR]: $t('editor_state.fetching_device_descriptor'),
        [EditorState.FETCHING_UAD_STATUS]: $t('editor_state.fetching_uad_status'),
        [EditorState.SENDING_NEW_UAD_META]: $t('editor_state.sending_new_uad_meta'),
        [EditorState.IMPORTING_FROM_DEVICE]: $t('editor_state.importing_from_device'),
        [EditorState.UPLOADING_TO_DEVICE]: $t('editor_state.uploading_to_device'),
        [EditorState.DEVICE_SAVING_UAD]: $t('editor_state.device_saving_uad'),
        [EditorState.DEVICE_LOADING_UAD]: $t('editor_state.device_loading_uad'),

        [EditorState.UPLOAD_TO_DEVICE_COMPLETED]: $t('editor_state.upload_to_device_completed'),
        [EditorState.IMPORT_FROM_DEVICE_COMPLETED]: $t('editor_state.import_from_device_completed'),

        [EditorState.GENERATING_UAD]: $t('editor_state.generating_uad'),
        [EditorState.PARSING_UAD]: $t('editor_state.parsing_uad'),
        
        [EditorState.BROWSER_NOT_SUPPORTED]: $t('editor_state.browser_not_supported'),
        [EditorState.NO_DEVICE_SELECTED]: $t('editor_state.no_device_selected'),
        [EditorState.DEVICE_NOT_IN_APP]: $t('editor_state.device_not_in_app'),
        [EditorState.FETCHING_DEVICE_DESCRIPTOR_ERROR]: $t('editor_state.fetching_device_descriptor_error'),
        [EditorState.FETCHING_UAD_STATUS_ERROR]: $t('editor_state.fetching_uad_status_error'),
        [EditorState.DEVICE_UAD_NOT_LOADED]: $t('editor_state.device_uad_not_loaded'),
        [EditorState.SENDING_NEW_UAD_META_ERROR]: $t('editor_state.sending_new_uad_meta_error'),
        [EditorState.IMPORT_ERROR]: $t('editor_state.import_error'),
        [EditorState.UPLOAD_ERROR]: $t('editor_state.upload_error'),
        [EditorState.DEVICE_SAVING_UAD_ERROR]: $t('editor_state.device_saving_uad_error'),
        [EditorState.DEVICE_LOADING_UAD_ERROR]: $t('editor_state.device_loading_uad_error'),

        [EditorState.GENERATING_UAD_ERROR]: $t('editor_state.generating_uad_error'),
        [EditorState.PARSING_UAD_ERROR]: $t('editor_state.parsing_uad_error'),
    };

    if (browser) {
        (async () => {
            if (browser && localStorage.getItem("settings") != null) {
                settings = JSON.parse(localStorage.getItem("settings"));
                console.log(settings);
            }
            settings_loaded = true;
        })();
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

            <div class="title" title= {__BUILD_STRING__}>
                <span>CONTROL MAP EDITOR</span>
            </div>

            <div class="controls">
                <!-- <div class="control" title={$t('editor.connect_device')} on:click={() => { this.editorStatePopupTitle = $t('editor.connect_device'); editorBackend.connectToDevice(); }}>
                    <Usb size={24} />
                    <span class="control-text">{$t('editor.connect_device')}</span>
                </div> -->
                <div class="control" title={$t('editor.import_from_file')} on:click={() => { editorStatePopupTitle = $t('editor.import_from_file'); editorBackend.importUADA(); }}>
                    <DocumentImport size={24} />
                    <span class="control-text">{$t('editor.import_from_file')}</span>
                </div>
                <div class="control" title={$t('editor.export_to_file')} on:click={() => { editorStatePopupTitle = $t('editor.export_to_file'); editorBackend.exportUADA(); }}>
                    <DocumentExport size={24} />
                    <span class="control-text">{$t('editor.export_to_file')}</span>
                </div>
                <div class="control" title={$t('editor.import_from_device')} on:click={() => { editorStatePopupTitle = $t('editor.import_from_device'); editorBackend.importFromDevice(); }}>
                    <Download size={24} />
                    <span class="control-text">{$t('editor.import_from_device')}</span>
                </div>
                <div class="control" title={$t('editor.upload_to_device')} on:click={() => { editorStatePopupTitle = $t('editor.upload_to_device'); editorBackend.uploadToDevice(); }}>
                    <Upload size={24} />
                    <span class="control-text">{$t('editor.upload_to_device')}</span>
                </div>
                <div class="control" title={$t('editor.settings')} on:click={() => showSetting = true}>
                    <Settings size={24} />
                    <span class="control-text">{$t('editor.settings')}</span>
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
                <button on:click={() => editorStateViewer = false}>{$t('editor.close')}</button>
            {/if}
        </div>
    </Popup>

    <Popup title="Settings" bind:show={showSetting}>
        <div class="settings-popup">
            <div class="setting">
                <div class="setting-name">
                    <span>{$t("setting.language") + ":"}</span>
                </div>
                <div class="setting-option">
                    <Dropdown
                        options={new Map($locales.map(key => [key, `lang.${key}`]))}
                        bind:value={settings.language}
                        on:changed={(e) => {
                            console.log("Language changed to: " + e.detail.option);
                            $locale = e.detail.option;
                            settings.language = e.detail.option;
                        }}
                    />
                </div>
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
        .setting {
                height: 35px;

                display: flex;
                align-items: center;

                .setting-name {
                    width: 250px;
                    display: flex;
                    align-items: center;

                    color: whitesmoke;

                    font-family: "Roboto Mono", sans-serif;
                    font-weight: 400;
                }

                .setting-option {
                    min-width: 300px;
                    display: flex;
                    flex-direction: row-reverse;
                }

            //     &.mobile {
            //         flex-direction: column;
            //         height: auto;
            //         gap: 10px;

            //         .setting-name {
            //             width: 100%;
            //         }

            //         .setting-option {
            //             width: 100%;
            //             flex-direction: row;
            //         }
            //  }
        }
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
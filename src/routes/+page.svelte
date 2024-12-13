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
    import { resize } from 'svelte-resize-observer-action'

    import {t, locale, locales} from "$lib/translations";

    import {browser} from "$app/environment";

    let updateCount: number = 0; //Cause all components to update
    let selectedKey:KeyID = undefined;
    let editorBackend = new KeymapEditor(update)

    let editorState:EditorState = EditorState.DISCONNECTED;
    let editorStateViewer:boolean = false;
    let editorStateViewerCloseable:boolean = true;
    let deviceTransferProgress:number = 0;

    const mobileViewWidthThreshold = 1000;
    const mobileViewAspectThreshold = 4/5;
    let mobileView = false;

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

    function onResize(entry: ResizeObserverEntry) {
        let width = entry.contentRect.width
        let height = entry.contentRect.height
        let newMobileView = width/height <= mobileViewAspectThreshold || width < mobileViewWidthThreshold;

        if(newMobileView != mobileView)
        {
            mobileView = newMobileView;
        }
    }

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

<main use:resize={onResize} class={mobileView ? "mobile" : ""}>
    <div class="editor-container">
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
                bind:mobileView={mobileView}
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
            <!-- {#if editorStateViewerCloseable}
                <button on:click={() => editorStateViewer = false}>{$t('editor.close')}</button>
            {/if} -->
                <button on:click={() => {editorStateViewerCloseable && (editorStateViewer = false)}} style = "opacity: {editorStateViewerCloseable ?  '1'  : '0'}">{$t('editor.close')}</button>
        </div>
    </Popup>

    <Popup title={$t("editor.settings")} bind:show={showSetting}>
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
                            $locale = e.detail.option;
                            settings.language = e.detail.option;
                        }}
                    />
                </div>
            </div>
            <button on:click={() => showSetting = false}>{$t('editor.close')}</button>
        </div>
    </Popup>
</main>

<style lang="scss">
    main {
        display: flex;

        width: 100vw;
        height: 100%;

        background-color: #eff0f3;
    }

    .mobile {
        flex-direction: column;
        gap: 0;
        overflow: hidden;
    }

    

    .editor-container {
        display: grid;
        grid-template-rows: 75px 1fr;
        flex-grow: 1;

        .header {
            display: grid;
            grid-template-columns: 1fr max-content 1fr; /* Three columns: logo, title, controls */
            grid-template-rows: 100px; /* Fixed height */
            align-items: center; /* Center items vertically */
        }

        .logo img {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 110px;
            padding: 34px;
            box-sizing: border-box;
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
            gap: 12px;
            justify-self: end;
        }

        .controls .control {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            min-width: 50px;
            padding: 0 12px;
            border-radius: 25px;
            background-color: black;
            color: white;
            cursor: pointer;
            transition: background-color 0.2s ease, max-width 0.3s ease;
            filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));
            box-sizing: border-box;
        }

        .controls .control:hover {
            background-color: #404040;
        }

        .controls .control:active {
            background-color: #404040;
            scale: 0.95;
        }

        .controls .control svg {
            width: 24px;
            height: 24px;
        }

        .controls .control span.control-text {
            font-family: Inter, sans-serif;
            font-size: 1rem;
            white-space: nowrap;
            opacity: 1;
            max-width: 0;
            overflow: hidden;
            direction: rtl;
            text-align: left;
            text-overflow: ellipsis;
            transition: max-width 0.3s ease, padding-left 0.3s ease;
            padding-left: 0px;
        }

        .controls .control:hover span.control-text {
            padding-left: 8px;
            max-width: 200px;
        }

        @media (max-width: 1500px) {
            .header {
                grid-template-columns: 1fr 1fr; /* Two columns: logo and controls */
            }

            .title {
                display: none; /* Hide title for smaller screens */
            }
        }

        @media (max-width: 1200px) {
            .header {
                min-height: 100px; /* Or any value that fits */
                padding-top: 60px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap:16px;
            }

            .logo img {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 28px;
                padding: 0px;
            }

            .title {
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Inter, sans-serif;
                font-weight: 400;
                letter-spacing: 0.2rem;
                padding-top: 3px;
                font-size: 1.8rem;
                text-align: center; /* Ensure the text is centered within the container */
                white-space: nowrap; /* Prevent text wrapping (optional) */
            }
        }


        .device-container {
            display: flex;
            justify-content: center;
            align-items: center;

            gap: 4rem;

            .device {
                width: 100%;
                max-width: min(600px, 90vw);

                box-sizing: border-box;
            }

            flex-direction: column;

        }

        .layer-selector {
            padding-bottom: 30px;
        }
    }

    .mobile .editor-container {
        display: flex;
        flex-direction: column;
        gap: 100px;
    }

    .sidebar-container {
        width: 335px;
        height: 100vh;
    }

    .mobile .sidebar-container {
        height: auto;
        width: 100vw;
    }
    


    .popup-error {
        filter: drop-shadow(0 0 12px rgba(255, 0, 0, 0.25));
        border: 1px solid red;
    }

    .settings-popup {
        width: 500px;

        max-width: 80vw;


        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Align items at the top initially */
        align-items: center;

        margin-top: 50px;
        gap: 50px;
        
        .setting {
            height: 35px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between; /* Spread items to each end */

            .setting-name {
                display: flex;
                align-items: center;
                color: black;
                font-family: "Roboto Mono", sans-serif;
                font-weight: 400;
            }

            .setting-option {
                display: flex;
                flex-direction: row-reverse;
            }
        }

        // .mobile .setting {
        //             flex-direction: column;
        //             height: auto;
        //             gap: 10px;

        //             .setting-name {
        //                 width: 100%;
        //             }

        //             .setting-option {
        //                 width: 100%;
        //                 flex-direction: row;
        //             }
        //      }

        button {
            margin-top: auto; /* Push the button to the bottom */
            border-radius: 6px;

            width: 80px;
            height: 40px;

            background-color: #dadada;
            border: 1px solid #cecece;

            transition: background-color 0.2s ease;
            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;

            flex-shrink: 0;

            transition: background-color 0.2s ease, width 0.2s ease, opacity 0.2s ease;

            filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));

            &:hover {
                background-color: #cecece;
            }

            &:active  {
                background-color: #cecece;
                scale: 0.95;
            }
        }
    }

    .editor-state-popup {
        width: 500px;
        height: 200px;

        max-width: 80vw;
        max-height: 80vw;

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
            border-radius: 6px;

            width: 80px;
            height: 40px;

            background-color: #dadada;
            border: 1px solid #cecece;

            transition: background-color 0.2s ease;
            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;

            flex-shrink: 0;

            transition: background-color 0.2s ease, width 0.2s ease, opacity 0.2s ease;

            filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));

            &:hover {
                background-color: #cecece;
            }

            &:active  {
                background-color: #cecece;
                scale: 0.95;
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
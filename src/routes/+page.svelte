<script lang="ts">
    import OverflowMenuHorizontal from "carbon-icons-svelte/lib/OverflowMenuHorizontal.svelte";
    import Matrix from "../components/Devices/Matrix.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import LayerSelector from "../components/LayerSelector.svelte";
    import { KeymapEditor } from "$lib/editors/KeymapEditor";
    import type { KeyConfig } from "$lib/types/Action";
    import type { KeyID } from "$lib/types/KeyID";

    import { Download } from "carbon-icons-svelte";

    let selectedKey:KeyID = undefined;
    let actionsOnSelectedKey: KeyConfig|undefined;
    let editorBackend = new KeymapEditor(updateActionsOnSelected)

    function updateActionsOnSelected(): void {
        actionsOnSelectedKey = editorBackend.getActions(selectedKey);
    }

    $: {
        selectedKey; // Mentioning selectedKey in here makes this reactive function run on every change of it
        updateActionsOnSelected();
    }

    function addAction(actionIdentifier: string): void {
        editorBackend.addAction(selectedKey, actionIdentifier);
    }

    function removeAction(actionIndex: number): void {
        editorBackend.removeAction(selectedKey, actionIndex)
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
                <span>KEYMAP EDITOR</span>
            </div>

            <div class="controls">
                <div class="control" on:click={() => editorBackend.uploadToDevice()}>
                    <Download size={24}/>
                </div>
                <div class="control">
                    <OverflowMenuHorizontal size={24}/>
                </div>
            </div>
        </div>

        <div class="device-container">
            <div class="device">
                <Matrix
                        bind:editorBackend={editorBackend}
                        bind:selectedKey={selectedKey}
                        bind:actionsOnSelectedKey={actionsOnSelectedKey}
                />
            </div>
        </div>
        <div class="layer-selector">
            <LayerSelector
                bind:editorBackend={editorBackend}
            />
        </div>
    </div>

    <div class="sidebar-container">
        <Sidebar
                bind:selectedKey={selectedKey}
                bind:showingActions={actionsOnSelectedKey}
                on:addAction={e => addAction(e.detail.actionIdentifier)}
                on:removeAction={e => removeAction(e.detail.index)}
        />
    </div>
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
            grid-template-rows: 75px;

            .logo {
                img {
                    display: flex;
                    justify-content: center;
                    align-items: center; 

                    height: 100%;
                    padding: 24px;
                    box-sizing: border-box;
                }
            }

            .title {
                display: flex;
                justify-content: center;
                align-items: center;

                font-family: Inter, sans-serif;
                font-weight: 400;
                letter-spacing: 0.4rem;
                font-size: 1.9rem;
            }

            .controls {
                display: flex;
                justify-content: end;
                align-items: center;
                padding-right: 18px;
                gap: 8px;

                .control {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;

                    background-color: black;
                    color: white;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    cursor: pointer;

                    transition: background-color 0.2s ease;
                    filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));

                    &:hover {
                    background-color: #404040;
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
        filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.25));
    }
</style>
<script lang="ts">
    import {createEventDispatcher, onDestroy, onMount} from 'svelte';
    import {KeymapEditor} from "$lib/editors/KeymapEditor";
    import type { Action, Effect, KeyConfig } from '$lib/types/Action';
    import type { KeyID } from '$lib/types/KeyID';

    const dispatch = createEventDispatcher();

    export let editorBackend: KeymapEditor

    export let selectedKey: KeyID = undefined;
    export let updateCount: number

    $: {
        updateCount; // Mentioning actionsOnSelectedKey in here makes the UI changes when it changes
        refreshGrid();
    }

    let activeActions: (KeyConfig|undefined)[][] = Array(8).fill(null).map(() => Array(8));

    function getCornerRadius(x: number, y: number) {
        switch (x + y * 10) {
            case 43:
                return "polygon(80% 0, 100% 20%, 100% 100%, 0 100%, 0 0)";
            case 44:
                return "polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%)";
            case 33:
                return "polygon(100% 0, 100% 80%, 80% 100%, 0 100%, 0 0)";
            case 34:
                return "polygon(100% 0, 100% 100%, 20% 100%, 0 80%, 0 0)";
            default:
                return "unset";
        }
    }

    function selectKey(key: KeyID) {
        selectedKey = key

        dispatch('selectKey', {
            key: key
        });
    }

    function getActionTitle(action: Action): string {
        switch (action.constructor.identifier) {
            case "midi":
                return action.data.type

            case "keyboard":
                return "Key"
        }

        return "None"
    }

    function getActionSubTitle(action: Action): string {
        switch (action.constructor.identifier) {
            case "midi":
                switch (action.data.type) {
                    case "Note":
                        return action.data.data.key
                    case "CC":
                        return action.data.data.control
                }
                break;

            case "keyboard":
                if (action.data.key !== undefined) {
                    return action.data.key
                        .replace("VK_", "")
                        .replace("CONTROL", "CTRL")
                        .replace("NUMPAD", "NUM ")
                }


        }

        return "None"
    }

    function refreshGrid() {
        // 8 by 8 dual for loop
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                activeActions[x][y] = editorBackend.getActions([x, y])
            }
        }
    }

    onMount(() => {
        refreshGrid()
    })

    // let refreshInterval = setInterval(() => refreshGrid(), 100)

    // onDestroy(() => {
    //     clearInterval(refreshInterval)
    // })
</script>

<div class="lp-border">
    {#each Array(8) as _, y}
        {#each Array(8) as _, x}
            <div class="matrix-button-container" class:selected={Array.isArray(selectedKey) && selectedKey[0] === x && selectedKey[1] === y}>
                <div class="matrix-button" on:click={() => selectKey([x, y])}
                     style="clip-path: {getCornerRadius(x, y)}">
                    {#if activeActions[x]?.[y]?.actions?.length === 1}
                        <div class="button-action-display">
                            <div class="action-display-container">
                                <span class="action-title">
                                    {getActionTitle(activeActions[x][y].actions[0])}
                                </span>

                                <div class="subtitle-container">
                                    <span class="action-subtitle">
                                        {getActionSubTitle(activeActions[x][y].actions[0])}
                                    </span>
                                </div>
                            </div>
                        </div>
                    {:else if activeActions[x]?.[y]?.actions?.length > 1}
                        <div class="button-action-display">
                            <div class="action-display-container">
                                <span class="action-title">
                                    ({activeActions[x][y].actions.length})
                                </span>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    {/each}
</div>

<style lang="scss">
    .lp-border {
        background: rgb(20, 20, 20);
        border: 2px solid rgb(120, 120, 120);
        border-radius: 3%;
        padding: 3%;
        filter: drop-shadow(0px 0px 12px rgba(0,0,0,0.5));

        aspect-ratio: 1 / 1;

        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 1.5%;
    }

    .matrix-button-container {
        width: 92%;
        height: 92%;
        margin: 4%;
        border-radius: 10%;

        &.selected {
            box-shadow: 0 0 0 4px cornflowerblue;
        }

        &:hover {
            margin: 2%;
            width: 96%;
            height: 96%;
        }
    }

    .matrix-button {
        width: 100%;
        height: 100%;
        border-radius: 8%;
        background-color: rgb(120, 120, 120);
        overflow: hidden;

        transition: background-color 0.1s ease;

        &:hover {
            background-color: rgb(80, 80, 80);
        }

        cursor: pointer;

        .button-action-display {
            width: 100%;
            height: 100%;

            background-color: #868686;

            display: grid;
            place-items: center;

            .action-display-container {
                width: 70%;
                height: 70%;
                border-radius: 8%;

                background-color: #ffffff;

                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                span {
                    font-family: Inter, sans-serif;
                }

                span.action-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .subtitle-container {
                    width: 100%;
                    padding: 0 8%;
                    box-sizing: border-box;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: center;

                    span.action-subtitle {
                        font-size: 0.8rem;
                        font-weight: 300;
                    }
                }
            }
        }
    }
</style>
<script lang="ts">
    import {createEventDispatcher, onDestroy, onMount} from 'svelte';
    import {Editor} from "$lib/editor/Editor";
    import type { Action, ActionInfoType, Effect, KeyAction } from '$lib/types/Action';
    import type { KeyID } from '$lib/types/KeyID';
    import { fade } from 'svelte/transition';

    import {t} from "$lib/translations";

    const dispatch = createEventDispatcher();

    export let editorBackend: Editor

    export let selectedKey: KeyID = undefined;
    export let updateCount: number

    $: {
        updateCount; // Mentioning actionsOnSelectedKey in here makes the UI changes when it changes
        refreshGrid();
    }

    let activeActions: (KeyAction|undefined)[][] = Array(8).fill(null).map(() => Array(8));

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
</script>

<div class="mystrix-border">
    {#each Array(8) as _, y}
        {#each Array(8) as _, x}
            <div class="mystrix-button-container" class:selected={Array.isArray(selectedKey) && selectedKey[0] === x && selectedKey[1] === y}>
                <div class="mystrix-button" on:click={() => selectKey([x, y])}
                     style="clip-path: {getCornerRadius(x, y)}">
                        <div class="button-action-display" style="background-color: {activeActions[x]?.[y]?.effects?.length > 0 ? activeActions[x]?.[y]?.effects[0].info("Color") : "#C0C0C0"}"> 
                        <!-- I don't like this since the color is hard coded in. TODO fix this -->
                        {#if activeActions[x]?.[y]?.actions?.length > 0}
                            <div class="action-display-container" in:fade="{{duration: 100}}" out:fade="{{duration: 100}}">
                                {#if activeActions[x][y].actions.length === 1}
                                <span class="action-title">
                                    {$t(activeActions[x][y].actions[0].info("Title"))}
                                </span>

                                    {#if activeActions[x][y].actions[0].info("Subtitle") != null}
                                    <div class="subtitle-container">
                                        <span class="action-subtitle">
                                            {$t(activeActions[x][y].actions[0].info("Subtitle"))}
                                        </span>
                                    </div>
                                    {/if}
                                {:else if activeActions[x][y].actions.length > 1}
                                <span class="action-title">
                                    ({activeActions[x][y].actions.length})
                                </span>     
                                {/if}
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    {/each}
</div>

<style lang="scss">
    .mystrix-border {
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

    .mystrix-button-container {
        width: 92%;
        height: 92%;
        margin: 4%;
        border-radius: 10%;

        &.selected {
            box-shadow: 0 0 0 4px cornflowerblue;
        }

        transition: width 0.1s ease, height 0.1s ease, margin 0.1s ease;

        &:hover {
            margin: 2%;
            width: 96%;
            height: 96%;
        }
    }

    .mystrix-button {
        width: 100%;
        height: 100%;
        border-radius: 8%;
        background-color: rgb(150, 150, 150);
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
                    text-overflow: clip;
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
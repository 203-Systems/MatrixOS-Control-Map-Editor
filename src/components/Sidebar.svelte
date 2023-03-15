<script lang="ts">
    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import AddActionMenu from "./AddActionMenu.svelte";
    import {createEventDispatcher} from 'svelte';
    import type {KeyConfig} from '$lib/types/Action';
    import type {KeyID} from "$lib/types/KeyID";
    import type {KeymapEditor} from "$lib/editors/KeymapEditor";

    const dispatch = createEventDispatcher();

    export let updateCount: number
    export let selectedKey: KeyID;
    export let editorBackend: KeymapEditor;
    let currentActions: KeyConfig | undefined;
    let tabIndex: 0 | 1 = 0;

    $: {
        updateCount;
        currentActions = editorBackend.getActions(selectedKey);
    }

    let showAddActionMenu: boolean = false;
</script>

<div class="sidebar-body">
    {#if selectedKey !== undefined}
        <div class="sidebar-topbar">
            <div
                    class="tab-button"
                    class:selected={tabIndex === 0}
                    on:click={() => tabIndex = 0}>

                <span>Actions</span>
            </div>

            <div
                    class="tab-button"
                    class:selected={tabIndex === 1}
                    on:click={() => tabIndex = 1}>

                <span>Effects</span>
            </div>

            <div class="add-button" on:click={() => showAddActionMenu = !showAddActionMenu}>
                <Add size={28}></Add>
            </div>
        </div>

        <AddActionMenu
                bind:show={showAddActionMenu}
                bind:tab={tabIndex}
                on:addAction={e => dispatch('addAction', { 'actionIdentifier': e.detail.actionIdentifier })}
        />

        {#if currentActions !== undefined}
            {#each currentActions.actions as action, index}
                {#if action.constructor.type === ["action", "effect"][tabIndex]}
                    <svelte:component
                            this={action.constructor.body}
                            bind:data={action.data}
                            on:removeAction={() => dispatch('removeAction', { index: index})}
                    />
                {/if}
            {/each}
        {/if}
    {:else}
        <div class="no-key-selected">
            <span>Please Select a Key</span>
        </div>
    {/if}
</div>

<style lang="scss">
    .sidebar-body {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 12px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        width: 335px;
        height: 100%;
        padding: 12.5px 0;

        overflow-y: scroll;

        background-color: white;

        /* width */
        &::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            background: #e8e8e8;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            padding: 2px;
            background: #656565;
            border: 2px solid #e8e8e8;
            border-radius: 8px;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background: #3a3a3a;
        }

        .no-key-selected {
            display: grid;
            place-items: center;

            width: calc(100% - 30px);
            height: 100%;

            border: 2px solid #bbbbbb;
            border-radius: 4px;

            cursor: not-allowed;

            user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;

            span {
                font-family: "Roboto Light", sans-serif;
                font-size: 18px;
            }
        }

        .sidebar-topbar {
            height: 50px;
            width: calc(100% - 30px);

            display: flex;

            border: 1px solid gray;
            border-radius: 4px;
            overflow: hidden;

            .tab-button {
                display: grid;
                place-items: center;

                width: 100%;

                cursor: pointer;

                user-select: none;
                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;

                &:hover {
                    background-color: #eff0f3;
                }

                &.selected {
                    background-color: #eff0f3;

                    &:hover {
                        background-color: #e0e0e0;
                    }
                }

                span {
                    font-family: "Roboto", sans-serif;
                    font-weight: 500;
                }
            }

            .add-button {
                display: grid;
                place-items: center;

                width: 50px;
                height: 50px;

                flex-shrink: 0;
                cursor: pointer;

                background-color: #e0e0e0;
                border-left: 1px solid gray;

                &:hover {
                    background-color: #cbcbcb;
                }
            }
        }
    }
</style>
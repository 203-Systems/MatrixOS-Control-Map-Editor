<script lang="ts">
    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import AddActionMenu from "./AddActionMenu.svelte";
    import {createEventDispatcher} from 'svelte';
    import type { KeyConfig } from '$lib/types/Action';
    import type { KeyID } from "$lib/types/KeyID";
    import type { KeymapEditor } from "$lib/editors/KeymapEditor";
    

    const dispatch = createEventDispatcher();

    export let updateCount: number
    export let selectedKey: KeyID;
    export let editorBackend: KeymapEditor;

    let currentTab: "actions"|"effects" = "actions";
    let currentActions: KeyConfig|undefined;

    $: {
        updateCount;
        currentActions = editorBackend.getActions(selectedKey);
    }

    let showAddActionMenu: boolean = false;
</script>

<div class="sidebar-body">
    <div class="menu-tab-selector">
        <div class="menu-tab-names">
            <div class="menu-tab-name-container" on:click={() => currentTab = "actions"}>
                <span>Actions</span>
            </div>
            <div class="menu-tab-name-container" on:click={() => currentTab = "effects"}>
                <span>Effects</span>
            </div>
        </div>
    
        <div class="menu-tab-underline-tray">
            <div class="menu-tab-underline" class:on-effect-tab={currentTab == "effects"}></div>
        </div>
    </div>

    {#if selectedKey != undefined}
        {#if currentActions != undefined}
            {#each currentActions.actions as action, index}
                <svelte:component
                        this={action.constructor.body}  
                        bind:data={action.data}
                        on:removeAction={() => dispatch('removeAction', { index: index})}
                />
            {/each}
        {/if}

        <button class="add-button" on:click={() => showAddActionMenu = !showAddActionMenu}>
            <Add size={28}></Add>

            {#if currentTab == "actions"}
                <span>Add an Action</span>
            {:else if currentTab == "effects"}
                <span>Add an Effect</span>
            {/if}
        </button>

        <AddActionMenu
            bind:selectedClass={currentTab}
            bind:show={showAddActionMenu}
            on:addAction={e => dispatch('addAction', { 'actionIdentifier': e.detail.actionIdentifier })}
        />
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

        .menu-tab-selector {
            padding-top: 6px;
            height: 32px;

            .menu-tab-names {
                height: 28px;
                display: flex;
                align-items: center;

                .menu-tab-name-container {
                    display: flex;
                    justify-content: center;
                    width: 100%;

                    cursor: pointer;

                    span {
                        font-family: "Roboto", sans-serif;

                        user-select: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                    }
                }
            }

            .menu-tab-underline-tray {
                height: 4px;

                .menu-tab-underline {
                    width: 80px;
                    height: 4px;
                    border-radius: 2px;
                    background-color: cornflowerblue;

                    margin-left: 35px;

                    transition: margin-left 0.2s ease, width 0.1s ease;

                    &.on-effect-tab {
                        width: 75px;
                        margin-left: 188px;
                    }
                }
            }
        }

        .add-button {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
            width: 300px;
            min-height: 50px;

            border: 1px solid cornflowerblue;
            background-color: #c7d7f8;
            border-radius: 4px;
            color: #2c2c2c;

            cursor: pointer;

            transition: background-color 0.2s ease;

            span {
                font-family: "Roboto Light", sans-serif;
                font-weight: 400;
                font-size: 18px;
            }

            &:hover {
                background-color: #b4c5e7;
            }
        }

        .no-key-selected {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
            width: 300px;
            min-height: 50px;

            border: 2px solid;
            border-radius: 4px;
            color: #2c2c2c;

            cursor: pointer;

            span {
                font-family: "Roboto Light", sans-serif;
                font-weight: 400;
                font-size: 18px;
                color: black;
            }
        }
        
    }
</style>
<script lang="ts">
    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import AddActionMenu from "./AddActionMenu.svelte";
    import {createEventDispatcher} from 'svelte';
    import type {KeyAction} from '$lib/types/Action';
    import type {KeyID} from "$lib/types/KeyID";
    import type {Editor} from "$lib/editor/Editor";
    import { effects } from "./actionbodies/ActionRegistry";
    import { resize } from 'svelte-resize-observer-action'
    
    import {t} from "$lib/translations";

    const dispatch = createEventDispatcher();

    export let updateCount: number
    export let selectedKey: KeyID;
    export let editorBackend: Editor;
    export let mobileView: boolean;
    let currentActions: KeyAction | undefined;
    let tabIndex: 0 | 1 = 0;
    const tabType: TypeAction[] = ["action", "effect"];
    let tabTextElements: HTMLDivElement[] = []
    let pageIndicatorElement: HTMLDivElement
    let type: TypeAction = "action"

    $: {
        updateCount;
        currentActions = editorBackend.getActions(selectedKey);
    }

    function updateUnderlinePosition()
    {
        if (tabTextElements.length != 0) {
            const tabTextElement = tabTextElements[tabIndex]

            const width = tabTextElement.clientWidth
            const left = tabTextElement.offsetLeft - tabTextElements[0].parentElement.offsetLeft

            pageIndicatorElement.style.setProperty("--posX", `${left}px`)
            pageIndicatorElement.style.setProperty("--width", `${width}px`)
        }
    }

    $: {
        tabIndex;
        
        updateUnderlinePosition()
        type = tabType[tabIndex];

    }

    let showAddActionMenu: boolean = false;
</script>

<div class="sidebar-container" use:resize={updateUnderlinePosition}>
    <div class="sidebar-body">
        {#if selectedKey === undefined}
        <div class="no-key-selected">
            <span>{$t(`editor.selectKeyToBegin`)}</span>
        </div>
        {/if}
        <div class="sidebar-topbar" style = "visibility: {selectedKey === undefined ? 'hidden' : 'visible'}">
            <div
                    class="tab-button"
                    class:selected={tabIndex === 0}
                    on:click={() => tabIndex = 0}>

                <span bind:this={tabTextElements[0]}>{$t(`editor.actions`)}</span>
            </div>

            <div
                    class="tab-button"
                    class:selected={tabIndex === 1}
                    on:click={() => tabIndex = 1}>

                <span bind:this={tabTextElements[1]}>{$t(`editor.effects`)}</span>
            </div>

            <div class="sidebar-page-indicator" bind:this={pageIndicatorElement}></div>
        </div>

        {#if currentActions !== undefined}
            {#each {"action": currentActions.actions, "effect": currentActions.effects}[type] as action, index}
                    <svelte:component
                            this={action.constructor.body}
                            bind:data={action.data}
                            on:removeAction={() => dispatch('removeAction', { type: type, index: index})}
                    />
            {/each}
        {/if}

        
        <div class="add-action-button" on:click={() => showAddActionMenu = !showAddActionMenu} style = "visibility: {selectedKey === undefined ? 'hidden' : 'visible'}">
            {#if type === "action"}
                <span>{$t(`editor.addAction`)}</span>
            {:else}
                <span>{$t(`editor.addEffect`)}</span>
            {/if}

            <Add size={24}></Add>
        </div>

        <AddActionMenu
                bind:show={showAddActionMenu}
                bind:type={type}
                on:addAction={e => dispatch('addAction', { type: type, actionIdentifier: e.detail.actionIdentifier })}
        />
    </div>
</div>

<style lang="scss">
    .sidebar-container {
        width: 100%;
        height: 100%;
        background-color: white;

        // overflow-y: scroll;

        // /* width */
        // &::-webkit-scrollbar {
        //     width: 10px;
        // }

        // /* Track */
        // &::-webkit-scrollbar-track {
        //     background: #e8e8e8;
        // }

        // /* Handle */
        // &::-webkit-scrollbar-thumb {
        //     padding: 2px;
        //     background: #656565;
        //     border: 2px solid #e8e8e8;
        //     border-radius: 8px;
        // }

        // /* Handle on hover */
        // &::-webkit-scrollbar-thumb:hover {
        //     background: #3a3a3a;
        // }
    }

    .sidebar-body {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 24px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        height: 100%;
        padding: 13.5px 0;
        max-width: 400px;
        margin: auto;

        .no-key-selected {
            display: grid;
            place-items: center;

            width: calc(100% - 30px);
            height: 60px;
            border: 1px solid black;

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

		.add-action-button {
			height: 40px;
			display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            padding: 0 8px;

			flex-shrink: 0;
			cursor: pointer;
			border-radius: 20px;

			background-color: #e0e0e0;

			&:hover {
				background-color: #cbcbcb;
			}

            span {
                padding-left: 8px;
				font-family: "Roboto Light", sans-serif;
            }
		}

        .sidebar-topbar {
            height: 40px;
            width: calc(100% - 30px);

            display: flex;

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

                span {
                    font-family: "Roboto", sans-serif;
                    font-weight: 500;
                }
            }

			.sidebar-page-indicator {
                position: absolute;
                margin-top: 36px;

                &:after {
                    content: ' ';
                    position: absolute;
                    height: 6px;
                    border-radius: 6px;
                    width: calc(var(--width) + 20px);
                    margin-left: calc(var(--posX) - 10px);
                    background-color: #6c9fff;

                    transition: width 0.2s ease, margin-left 0.2s ease;
                }
            }
        }
    }
</style>
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
    let tabTextElements: HTMLDivElement[] = []
    let pageIndicatorElement: HTMLDivElement

    $: {
        updateCount;
        currentActions = editorBackend.getActions(selectedKey);
    }

    $: {
        tabIndex;

        if (tabTextElements.length != 0) {
            const tabTextElement = tabTextElements[tabIndex]

            const width = tabTextElement.clientWidth
            const left = tabTextElement.offsetLeft - tabTextElements[0].parentElement.offsetLeft

            pageIndicatorElement.style.setProperty("--posX", `${left}px`)
            pageIndicatorElement.style.setProperty("--width", `${width}px`)
        }


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

                <span bind:this={tabTextElements[0]}>Actions</span>
            </div>

            <div
                    class="tab-button"
                    class:selected={tabIndex === 1}
                    on:click={() => tabIndex = 1}>

                <span bind:this={tabTextElements[1]}>Effects</span>
            </div>

            <div class="sidebar-page-indicator" bind:this={pageIndicatorElement}></div>
        </div>

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

        <div class="add-action-button" on:click={() => showAddActionMenu = !showAddActionMenu}>
            <span>Add Action</span>

            <Add size={24}></Add>
        </div>

        <AddActionMenu
                bind:show={showAddActionMenu}
                bind:tab={tabIndex}
                on:addAction={e => dispatch('addAction', { 'actionIdentifier': e.detail.actionIdentifier })}
        />
    {:else}
        <div class="no-key-selected">
            <span>Please Select a Key to begin</span>
        </div>
    {/if}
</div>

<style lang="scss">
    .sidebar-body {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 24px;
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
                height: 10px;
                width: 255px;
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
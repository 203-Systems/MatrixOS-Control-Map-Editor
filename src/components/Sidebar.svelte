<script lang="ts">
    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import AddActionMenu from "./AddActionMenu.svelte";
    import {createEventDispatcher, SvelteComponent} from 'svelte';
    import MidiNoteAction from "./actionbodies/MidiActionBody.svelte";
    import KeyboardActionBody from "./actionbodies/KeyboardActionBody.svelte";

    const dispatch = createEventDispatcher();

    export let selectedKey: number = 11;
    export let showingActions: object[];

    let showAddActionMenu: boolean = false;

    let actionBodies: { [id: string]: SvelteComponent } = {
        "action.note": MidiNoteAction,
        "action.keyboard": KeyboardActionBody,
    };
</script>

<div class="sidebar-body">
    {#each showingActions as showingAction}
        <svelte:component
                this={actionBodies[showingAction.actionIdentifier]}
                bind:data={showingAction.actionData}
                on:removeAction={() => dispatch('removeAction', { index: showingActions.indexOf(showingAction) })}
        />
    {/each}

    <button class="add-button" on:click={() => showAddActionMenu = !showAddActionMenu}>
        <Add size={28}></Add>

        <span>Add a Action</span>
    </button>

    <AddActionMenu
        bind:show={showAddActionMenu}
        on:addAction={e => dispatch('addAction', { 'actionIdentifier': e.detail.actionIdentifier })}
    />
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

            span {
                font-family: "Roboto Light", sans-serif;
                font-weight: 400;
                font-size: 18px;
            }

            &:hover {
                background-color: #b4c5e7;
            }
        }
    }
</style>
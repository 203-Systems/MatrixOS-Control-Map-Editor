<script lang="ts">
    import { actions, effects } from "./actionbodies/ActionRegistry";
    import type { ActionType } from "$lib/types/ActionType";
    import { createEventDispatcher, SvelteComponent } from 'svelte';

    export let show: boolean = false;
    export let type:ActionType = "action";

    import {t} from "$lib/translations";
    
    const dispatch = createEventDispatcher();

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent("outclick"));

                setTimeout(() => show = false, 0) // This way, the UI even hides if the Enabling Button was clicked to hide it again
            }
        };

        document.addEventListener("click", handleClick, true);

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true);
            }
        };
    }

    function addAction(actionIdentifier: string): void {
        dispatch('addAction', {
            actionIdentifier: actionIdentifier
        });

        show = false;
    }
</script>

{#if show}
    <div class="menu-container" use:clickOutside on:outclick={() => (show = false)}>
        <div class="menu-action-list">
            {#each Object.entries({"action": actions, "effect": effects}[type] ) as action}
                    <div class="menu-action-item" on:click={() => addAction(action[0])}>
                        <div class="icon-section">
                            <svelte:component this={action[1].icon} size={24}/>
                        </div>

                        <div class="label-section">
                            <span>{$t(action[1].description)}</span>
                        </div>
                    </div>
            {/each}
        </div>
    </div>
{/if}

<style lang="scss">
    .menu-container {
        width: 300px;
        max-height: 325px;
        border-radius: 8px;
        border: 1px solid lightgray;
        filter: drop-shadow(1px 2px 2px #818181);

        background-color: white;

        display: flex;
        gap: 10px;
        flex-direction: column;

        .menu-action-list {
            width: 100%;
            height: 100%;

            overflow-x: hidden;
            overflow-y: auto;

            display: flex;
            flex-direction: column;
            gap: 10px;

            box-sizing: border-box;
            padding: 8px;

            .menu-action-item {
                height: 50px;
                width: 100%;
                display: flex;

                background: #dde8fd;
                border-radius: 4px;

                transition: background-color 0.1s ease;

                cursor: pointer;

                &:hover {
                    background: #c8dbfa;
                }

                .icon-section {
                    height: 100%;
                    aspect-ratio: 1/1;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .label-section {
                    width: 100%;

                    display: flex;
                    align-items: center;
                    text-indent: 10px;

                    font-family: "Roboto", sans-serif;

                    user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    -moz-user-select: none;
                }
            }
        }
    }
</style>
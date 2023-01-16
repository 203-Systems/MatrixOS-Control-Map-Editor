<script lang="ts">
    import type {MidiActionData} from "$lib/types/MidiActionData";
    import ActionTemplate from "./ActionTemplate.svelte";
    import {TrashCan, ChevronDown, ChevronRight} from "carbon-icons-svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let expanded: boolean = true;
</script>

<div class="action-body" class:is-expanded={expanded}>
    <div class="action-header">
        <div class="icon-section" on:click={() => expanded = !expanded}>
            {#if expanded}
                <ChevronDown/>
            {:else}
                <ChevronRight/>
            {/if}
        </div>

        <div class="text-section">
            <span>Play a Midi Note</span>
        </div>

        <div class="icon-section delete-icon" on:click={() => dispatch('removeAction')}>
            <TrashCan/>
        </div>
    </div>

    {#if expanded}
        <div class="action-controls">
            <slot></slot>
        </div>
    {/if}
</div>

<style lang="scss">
    .action-body {
        width: calc(100% - 25px);

        border: 1px solid #ababab;
        border-radius: 6px;

        display: flex;
        flex-direction: column;
        overflow: hidden;

        flex-shrink: 0;

        .action-header {
            min-height: 35px;
            display: grid;
            grid-template-columns: 35px 1fr 35px;

            background-color: #eaeaea;

            .icon-section {
                display: flex;
                justify-content: center;
                align-items: center;

                cursor: pointer;

                &:hover {
                    background-color: #d5d5d5;
                }

                &.delete-icon {
                    &:hover {
                        color: white;

                        background-color: #f65454;
                    }
                }
            }

            .text-section {
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: "Roboto", sans-serif;

                user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                -moz-user-select: none;
            }
        }

        .action-controls {
            height: min-content;

            background-color: #fcfcfc;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
<script lang="ts">
    import type {MidiActionData} from "$lib/types/MidiActionData";
    import {TrashCan, ChevronDown, ChevronRight} from "carbon-icons-svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let data: MidiActionData;

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

    <div class="action-controls">
        <div class="setting-section">
            <span>Key</span>

            <input type="number" min={0} max={127} bind:value={data.key}>
        </div>

        <div class="setting-section">
            <span>Velocity</span>

            <input type="number" min={0} max={127} bind:value={data.velocity}>
        </div>

        <div class="setting-section">
            <span>Channel</span>

            <input type="number" min={1} max={16} bind:value={data.channel}>
        </div>
    </div>
</div>

<style lang="scss">
    .action-body {
        min-height: 35px;
        width: calc(100% - 25px);

        border: 1px solid gray;
        border-radius: 6px;

        display: flex;
        flex-direction: column;
        overflow: hidden;

        transition: min-height 0.2s ease;

        &.is-expanded {
            min-height: 120px;
        }

        .action-header {
            min-height: 35px;
            display: grid;
            grid-template-columns: 35px 1fr 35px;

            background-color: #e0e0e0;

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
            height: 85px;

            background-color: #f8f8f8;

            display: flex;
            justify-content: center;
            align-items: center;

            gap: 10px;

            .setting-section {
                height: 100%;
                width: 80px;
                box-sizing: border-box;
                padding-top: 16px;

                display: flex;
                align-items: center;
                flex-direction: column;

                span {
                    font-family: "Roboto Light", sans-serif;
                    font-size: 14px;
                }

                input {
                    margin-top: 10px;
                    width: 90%;
                    height: 25px;
                    border-radius: 4px;
                    border: 1px solid gray;

                    text-indent: 8px;
                    font-family: "Roboto Light", sans-serif;
                    font-size: 14px;
                }
            }
        }
    }
</style>
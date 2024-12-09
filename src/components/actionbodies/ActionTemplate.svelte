<script lang="ts">
    import type {MidiActionData} from "/src/components/actionbodies/Midi/MidiActionData";
    import ActionTemplate from "./ActionTemplate.svelte";
    import {TrashCan, ChevronDown, ChevronRight} from "carbon-icons-svelte";
    import { createEventDispatcher } from 'svelte';
    import './Action.css';

    const dispatch = createEventDispatcher();

    export let actionTitle: string = "Action"
    let expanded: boolean = true;
</script>

<div class="action-body" class:is-expanded={expanded}>
    <div class="action-header">
        <div class="action-icon" on:click={() => expanded = !expanded}>
            {#if expanded}
                <ChevronDown/>
            {:else}
                <ChevronRight/>
            {/if}
        </div>

        <div class="action-title">
            <span>{actionTitle}</span>
        </div>

        <div class="action-icon delete-icon" on:click={() => dispatch('removeAction')}>
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
</style>
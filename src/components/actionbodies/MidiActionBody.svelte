<script lang="ts">
    import type {MidiActionData} from "$lib/types/MidiActionData";
    import ActionTemplate from "./ActionTemplate.svelte";
    import DropDown from "../common/DropDown.svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let data: MidiActionData;
</script>

<ActionTemplate on:removeAction={() => dispatch('removeAction')}>
    <div class="midi-action-body">
        <div class="setting-slot">
            <span>Message Type</span>

            <DropDown options={["Note", "CC"]} bind:value={data.type}/>
        </div>
    </div>
</ActionTemplate>

<style lang="scss">
    .midi-action-body {
        width: 100%;
        padding: 4px 0;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .setting-slot {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 0 12px;

            font-family: Roboto, sans-serif;
            font-size: 14px;
        }
    }
</style>
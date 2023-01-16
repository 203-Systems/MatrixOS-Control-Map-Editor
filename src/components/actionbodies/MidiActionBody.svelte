<script lang="ts">
    import type {MidiActionData} from "$lib/types/MidiActionData";
    import ActionTemplate from "./ActionTemplate.svelte";
    import DropDown from "../common/DropDown.svelte";
    import {createEventDispatcher} from 'svelte';
    import NumericUpDown from "../common/NumericUpDown.svelte";
    import CheckBox from "../common/CheckBox.svelte";

    const dispatch = createEventDispatcher();

    export let data: MidiActionData;

    const stringifiedChannels = [
        "Channel 1",
        "Channel 2",
        "Channel 3",
        "Channel 4",
        "Channel 5",
        "Channel 6",
        "Channel 7",
        "Channel 8",
        "Channel 9",
        "Channel 10",
        "Channel 11",
        "Channel 12",
        "Channel 13",
        "Channel 14",
        "Channel 15",
        "Channel 16"
    ]

    function changeMidiActionType(type: "Note" | "CC"): void {
        switch (type) {
            case "Note":
                data.data = {
                    key: 0,
                    velocity: false,
                    channel: 0,
                }
                break;

            case "CC":
                data.data = {
                    control: 0,
                    value: 0,
                    channel: 0,
                }
                break;
        }
    }

    function selectChannel(channel: string): void {
        data.data.channel = parseInt(channel.split(" ")[1]) - 1
    }
</script>

<ActionTemplate on:removeAction={() => dispatch('removeAction')}>
    <div class="midi-action-body">
        <div class="setting-slot">
            <span>Message Type</span>

            <DropDown options={["Note", "CC"]} bind:value={data.type} on:selectionChanged={e => changeMidiActionType(e.detail.option)}/>
        </div>

        {#if data.type === "Note"}
            <div class="setting-slot">
                <span>Midi Key</span>

                <NumericUpDown bind:value={data.data.key} min={0} max={127}/>
            </div>

            <div class="setting-slot">
                <span>Velocity Sensitive</span>

                <CheckBox bind:toggled={data.data.velocity}/>
            </div>
        {:else if data.type === "CC"}
            <div class="setting-slot">
                <span>Control</span>

                <NumericUpDown bind:value={data.data.control} min={0} max={127}/>
            </div>

            <div class="setting-slot">
                <span>Value</span>

                <NumericUpDown bind:value={data.data.value} min={0} max={127}/>
            </div>
        {/if}

        <div class="setting-slot">
            <span>Channel</span>

            <DropDown options={stringifiedChannels} value={stringifiedChannels[data.data.channel]} on:selectionChanged={e => selectChannel(e.detail.option)}/>
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
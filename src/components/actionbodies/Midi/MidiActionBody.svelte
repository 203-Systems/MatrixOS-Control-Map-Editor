<script lang="ts">
    import type { MidiActionData } from "./MidiActionData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import DropDown from "../../common/DropDown.svelte";
    import {createEventDispatcher} from 'svelte';
    import NumericUpDown from "../../common/NumericUpDown.svelte";
    import CheckBox from "../../common/CheckBox.svelte";
    import {MidiAction} from "./MidiAction";

    const dispatch = createEventDispatcher();
    
    export let data: MidiActionData;

    function changeMidiActionType(type: "Note" | "CC"): void {
        switch (type) {
            case "Note":
                data.data = {
                    key: 60,
                    velocity: true,
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
</script>

<ActionTemplate actionTitle={MidiAction.description} on:removeAction={() => dispatch('removeAction')}>
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
            
            <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
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
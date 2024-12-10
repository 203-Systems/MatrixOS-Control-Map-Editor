<script lang="ts">
    import type {GamepadActionData} from "./GamepadAction";
    import ActionTemplate from "../ActionTemplate.svelte";
    import Button from "../../common/Button.svelte";
    import {createEventDispatcher} from 'svelte';
    import GamepadActionPopup from "./GamepadActionPopup.svelte";
    import {GamepadAction} from "./GamepadAction";
    import {GamepadKeycode, GamepadKeycodeFriendlyName, AnalogSource, AnalogSourceFriendlyName, GamepadDpadDirectionFriendlyName} from "./GamepadActionData";
    import DropDown from "../../common/DropDown.svelte";
    import FloatUpDown from "../../common/FloatUpDown.svelte";
    import '../Action.css';

    const dispatch = createEventDispatcher();

    export let data: GamepadActionData;

    let showSelectKeyPopup: boolean = false;
</script>

<ActionTemplate actionTitle={GamepadAction.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="action-settings">
        <div class="preview-key-section" on:click={() => showSelectKeyPopup = true}>
            <div class="key-preview">
                {#if data.key === undefined}
                <span >No Key Selected</span>
                {:else}
                <span style="font-size: 20px;">{
                        GamepadKeycodeFriendlyName[data.key]
                }</span>
                {/if}
            </div>
        </div>
        {#if data.key >= GamepadKeycode.GAMEPAD_X_AXIS && data.key <= GamepadKeycode.GAMEPAD_RZ_AXIS}
        <div class="action-setting-slot">
            <span>Analog Source</span>

            <DropDown options={AnalogSourceFriendlyName} bind:value={data.analog}/>
        </div>
        <div class="action-setting-slot">
            <span>Range</span>
            <FloatUpDown bind:value={data.begin} min={-1.0} max={1.0}/>
            <FloatUpDown bind:value={data.end} min={-1.0} max={1.0}/>
        </div>
        {:else if data.key === GamepadKeycode.GAMEPAD_DPAD}
        <div class="action-setting-slot">
            <span>D-Pad Direction</span>

            <DropDown options={GamepadDpadDirectionFriendlyName} bind:value={data.dpad}/>
        </div>
        {/if}
    </div>
</ActionTemplate>

<GamepadActionPopup bind:selectedKey={data.key} bind:show={showSelectKeyPopup}/>

<style lang="scss">
    .preview-key-section {
        height: 100px;

        display: flex;
        justify-content: center;
        align-items: center;

        .key-preview {
            width: 80px;
            height: 80px;
            background: white;
            border: 2px solid #8f8f8f;
            border-radius: 10%;

            display: flex;
            justify-content: center;
            align-items: center;

            font-family: Inter, sans-serif;
            font-size: 14px;
            text-align: center;

            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 4px rgba(0, 0, 0, 0.25);

            user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -webkit-user-select: none;
        }
    }

    .change-key-section {
        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
    }


</style>
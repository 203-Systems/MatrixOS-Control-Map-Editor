<script lang="ts">
    import type { WrapActionData } from "./WrapActionData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import {createEventDispatcher} from 'svelte';
    import NumericUpDown from "../../common/NumericUpDown.svelte";
    import CheckBox from "../../common/CheckBox.svelte";
    import {WrapAction} from "./WrapAction";

    const dispatch = createEventDispatcher();
    
    export let data: WrapActionData;

    function changeWrapPosMode(mode: boolean): void {
        data.x = 0;
        data.y = 0;
    }

    function changeWrapLayerMode(mode: boolean): void {
        data.layer = mode ? 0 : 1;
    }
</script>

<ActionTemplate actionTitle={WrapAction.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="action-settings">
        <div class="action-setting-slot">
            <span>Relative Layer</span>

            <CheckBox bind:checked={data.relativeLayer} on:changed={e => changeWrapLayerMode(e.detail.checked)}/>
        </div>
        {#if data.relativeLayer === false}
            <div class="action-setting-slot">
                <span>Layer</span>
                <NumericUpDown bind:value={data.layer} min={1} max={16}/> 
            </div>
        {:else}
            <div class="action-setting-slot">
                <span>Layer offset</span>
                <NumericUpDown bind:value={data.layer} min={-15} max={15}/> 
            </div>
        {/if}
        <div class="action-setting-slot">
            <span>Relative Position</span>

            <CheckBox bind:checked={data.relativePos} on:changed={e => changeWrapPosMode(e.detail.checked)}/>
        </div>
        {#if data.relativePos === false}
            <div class="action-setting-slot">
                <span>X</span>
                <NumericUpDown bind:value={data.x} min={0} max={8}/> 
            </div>
            <div class="action-setting-slot">
                <span>Y</span>
                <NumericUpDown bind:value={data.y} min={0} max={8}/> 
            </div>
        {:else}
            <div class="action-setting-slot">
                <span>X offset</span>
                <NumericUpDown bind:value={data.x} min={-7} max={7}/> 
            </div>
            <div class="action-setting-slot">
                <span>Y offset</span>
                <NumericUpDown bind:value={data.y} min={-7} max={7}/> 
            </div>
        {/if}
    </div>
</ActionTemplate>

<style lang="scss">
    .action-setting-slot {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 12px;

        font-family: Roboto, sans-serif;
        font-size: 14px;
    }
</style>
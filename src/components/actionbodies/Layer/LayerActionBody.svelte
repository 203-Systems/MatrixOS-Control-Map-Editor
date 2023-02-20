<script lang="ts">
    import type { LayerActionData } from "./LayerActionData";
    import {LayerActionMode, LayerActionType, LayerActionOption} from "./LayerActionData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import DropDown from "../../common/DropDown.svelte";
    import {createEventDispatcher} from 'svelte';
    import NumericUpDown from "../../common/NumericUpDown.svelte";
    import CheckBox from "../../common/CheckBox.svelte";
    import {LayerAction} from "./LayerAction";

    const dispatch = createEventDispatcher();
    
    export let data: LayerActionData;

    function changeLayerActionMode(mode: string): void {
        
    }

    function changeLayerIndexMode(mode: boolean): void {
        if(mode)
        {
            data.layer = 0;
        }
        else
        {
            data.layer = 1;
        }
    }
</script>

<ActionTemplate actionTitle={LayerAction.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="layer-action-body">
        <div class="setting-slot">
            <span>Layer Action Mode</span>

            <DropDown options={Object.keys(LayerActionMode)} bind:value={data.mode} on:selectionChanged={e => changeLayerActionMode(e.detail.option)}/>
        </div>
        <div class="setting-slot">
            <span>Layer Action Type</span>

            <DropDown options={Object.keys(LayerActionType)} bind:value={data.type} on:selectionChanged={e => changeLayerActionMode(e.detail.option)}/>
        </div>
        <div class="setting-slot">
            <span>Layer Action Option</span>

            <DropDown options={Object.keys(LayerActionOption)} bind:value={data.option} on:selectionChanged={e => changeLayerActionMode(e.detail.option)}/>
        </div>
        <div class="setting-slot">
            <span>Relative Indexing</span>

            <CheckBox bind:toggled={data.relative} on:changed={e => changeLayerIndexMode(e.detail.toggled)}/>
        </div>
        {#if data.relative === false}
            <div class="setting-slot">
                <span>Layer Number</span>

                <NumericUpDown bind:value={data.layer} min={1} max={16}/>
            </div>
        {:else}
            <div class="setting-slot">
                <span>Layer Offset</span>

                <NumericUpDown bind:value={data.layer} min={-15} max={15}/>
            </div>
        {/if}
    </div>
</ActionTemplate>

<style lang="scss">
    .layer-action-body {
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
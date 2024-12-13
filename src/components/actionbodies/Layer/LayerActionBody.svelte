<script lang="ts">
    import type { LayerActionData } from "./LayerActionData";
    import {LayerActionMode, LayerActionType, LayerActionOption} from "./LayerActionData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import DropDown from "../../common/DropDown.svelte";
    import {createEventDispatcher} from 'svelte';
    import NumericUpDown from "../../common/NumericUpDown.svelte";
    import CheckBox from "../../common/CheckBox.svelte";
    import {LayerAction} from "./LayerAction";
    import '../Action.css';

    const dispatch = createEventDispatcher();
    
    export let data: LayerActionData;

    function changeLayerActionMode(mode: string): void {
        
    }

    function changeLayerIndexMode(mode: boolean): void {
        data.layer = mode ? 0 : 1;
    }
</script>

<ActionTemplate actionTitle={LayerAction.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="action-settings">
        <div class="action-setting-slot">
            <span>Layer Action Mode</span>

            <DropDown options={Object.keys(LayerActionMode)} bind:value={data.mode} on:changed={e => changeLayerActionMode(e.detail.option)}/>
        </div>
        <div class="action-setting-slot">
            <span>Layer Action Type</span>

            <DropDown options={Object.keys(LayerActionType)} bind:value={data.type} on:changed={e => changeLayerActionMode(e.detail.option)}/>
        </div>
        <div class="action-setting-slot">
            <span>Layer Action Option</span>

            <DropDown options={Object.keys(LayerActionOption)} bind:value={data.option} on:changed={e => changeLayerActionMode(e.detail.option)}/>
        </div>
        <div class="action-setting-slot">
            <span>Relative Indexing</span>

            <CheckBox bind:checked={data.relative} on:changed={e => changeLayerIndexMode(e.detail.checked)}/>
        </div>
        {#if data.relative === false}
            <div class="action-setting-slot">
                <span>Layer Number</span>

                <NumericUpDown bind:value={data.layer} min={1} max={16}/>
            </div>
        {:else}
            <div class="action-setting-slot">
                <span>Layer Offset</span>

                <NumericUpDown bind:value={data.layer} min={-15} max={15}/>
            </div>
        {/if}
    </div>
</ActionTemplate>

<style lang="scss">

</style>
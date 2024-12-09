<script lang="ts">
    import type { ActionColorEffectData } from "./ActionColorEffectData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import { createEventDispatcher } from 'svelte';
    import '../Action.css';
    import CheckBox from "../../common/CheckBox.svelte";

    const dispatch = createEventDispatcher();
    export let data: ActionColorEffectData;

    function updateColor(color: string, target: number){
        const rgb = hexToRgb(color);
        if (rgb) {
            data[target][0] = rgb.r / 255;
            data[target][1] = rgb.g / 255;
            data[target][2] = rgb.b / 255;
        }
    }

    function updateColorEnabled(enabled: boolean, target: number){
        data.enabled[target] = enabled;
    }

    function rgbToHex(r: number, g: number, b: number): string {
        return `#${((1 << 24) + (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255))
            .toString(16)
            .slice(1)}`;
    }

    function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    }
</script>

<ActionTemplate actionTitle="Action  Color Effect" on:removeAction={() => dispatch('removeAction')}>
    <div class="action-settings">
        <div class="action-settings">
            {#each Array(16) as _, index}
                <div class="action-setting-slot">
                    {#if index === 0}
                        <span style="flex-grow: 1;">Idle Color</span>
                    {:else}
                        <span style="flex-grow: 1;">Color {index}</span>
                    {/if}
                    <span >Enable </span>
                    <input 
                        type="checkbox" 
                        
                        bind:checked={data.enabled[index]} 
                        on:changed={e => updateColorEnabled(e.detail.toggled, index)}
                    />
                    <!-- <CheckBox bind:checked={data.enabled[index]} on:changed={e => updateColorEnabled(e.detail.toggled, index)}/> -->
                    <input
                        type="color"
                        class="color-input"
                        value={rgbToHex(data.color[index][0], data.color[index][1], data.color[index][2])}
                        on:input={(e) => updateColor(e.target.value, index)}
                    />
                </div>
            {/each}
        </div>
    </div>
</ActionTemplate>

<style lang="scss">
    .color-input {
        border: 0px;
        padding: 0px;
        margin-left:5px;
        outline: 0px; /* Optional: Removes the focus outline */
        border-radius: 10%; /* Optional: Makes it circular */
        cursor: pointer; /* Optional: Adds a pointer cursor */
    }
</style>
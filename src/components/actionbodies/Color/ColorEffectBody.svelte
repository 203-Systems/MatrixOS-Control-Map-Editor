<script lang="ts">
    import {ColorEffect} from "./ColorEffect";
    import type { ColorEffectData } from "./ColorEffectData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import { createEventDispatcher } from 'svelte';
    import '../Action.css';

    import {t} from "$lib/translations";

    const dispatch = createEventDispatcher();
    export let data: ColorEffectData;

    function updateColor(color: string, target: 'default' | 'activated') {
        const rgb = hexToRgb(color);
        if (rgb) {
            data[target][0] = rgb.r / 255;
            data[target][1] = rgb.g / 255;
            data[target][2] = rgb.b / 255;
            ColorEffect.defaultData[target] = data[target];
        }

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

<ActionTemplate actionTitle={$t("color.title")} on:removeAction={() => dispatch('removeAction')}>
    <div class="action-settings">
        <div class="action-setting-slot">
            <span>{$t(`color.idleColor`)}</span>
            <input
                type="color"
                class="color-input"
                value={rgbToHex(data.default[0], data.default[1], data.default[2])}
                on:input={(e) => updateColor(e.target.value, 'default')}
            />
        </div>

        <div class="action-setting-slot">
            <span>{$t(`color.activatedColor`)}</span>

            <input
            type="color"
            class="color-input"
            value={rgbToHex(data.activated[0], data.activated[1], data.activated[2])}
            on:input={(e) => updateColor(e.target.value, 'activated')}
        />
        </div>
    </div>
</ActionTemplate>

<style lang="scss">
    .color-input {
        border: 0px;
        padding: 0px;
        outline: 0px; /* Optional: Removes the focus outline */
        border-radius: 10%; /* Optional: Makes it circular */
        cursor: pointer; /* Optional: Adds a pointer cursor */
    }
</style>
<script lang="ts">
    import type { ColorEffectData } from "./ColorEffectData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import {createEventDispatcher, onMount} from 'svelte';
    import {ColorEffect} from "./ColorEffect";
    import NumericUpDown from "../../common/NumericUpDown.svelte";
    import {hsl_to_rgb, rgb_to_hsl} from "../../../lib/utils/colors";
    import "reinvented-color-wheel/css/reinvented-color-wheel.min.css";
    import ReinventedColorWheel from "reinvented-color-wheel";

    const dispatch = createEventDispatcher();
    export let data: ColorEffectData;

    let hslData = {
        hue: 0,
        saturation: 0,
        lightness: 0
    };

    let isMounted: boolean = false
    let pickerDiv: HTMLDivElement
    let colorWheel: ReinventedColorWheel

    $: {
        hslData;

        if (isMounted) {
            let rgbData = hsl_to_rgb(hslData.hue, hslData.saturation, hslData.lightness)

            data.red = rgbData[0] / 255
            data.green = rgbData[1] / 255
            data.blue = rgbData[2] / 255
        }
    }

    onMount(() => {
        let rgbToHSL = rgb_to_hsl(data.red * 255, data.green * 255, data.blue * 255)

        hslData.hue = rgbToHSL[0]
        hslData.saturation = rgbToHSL[1]
        hslData.lightness = rgbToHSL[2]

        colorWheel = new ReinventedColorWheel({
            hsl: [hslData.hue, hslData.saturation, hslData.lightness],
            appendTo: pickerDiv,
            wheelDiameter: 280,
            wheelThickness: 26,
            handleDiameter: 16,
            wheelReflectsSaturation: false,
            onChange: function (color) {
                data.red = color.rgb[0] / 255
                data.green = color.rgb[1] / 255
                data.blue = color.rgb[2] / 255

                hslData.hue = color.hsl[0]
                hslData.saturation = color.hsl[1]
                hslData.lightness = color.hsl[2]
            },
        })

        isMounted = true
    })
</script>

<ActionTemplate actionTitle={ColorEffect.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="color-effect-body">
        <div bind:this={pickerDiv}></div>

        <div class="color-indicators">
            <div class="color-slot">
                <span>Hue</span>

                <NumericUpDown bind:value={hslData.hue}></NumericUpDown>
            </div>

            <div class="color-slot">
                <span>Saturation</span>

                <NumericUpDown bind:value={hslData.saturation}></NumericUpDown>
            </div>

            <div class="color-slot">
                <span>Lightness</span>

                <NumericUpDown bind:value={hslData.lightness}></NumericUpDown>
            </div>
        </div>
    </div>
</ActionTemplate>

<style lang="scss">
    .color-effect-body {
        width: 100%;
        height: 400px;
        padding: 4px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
    }

    .color-indicators {
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding: 0 1rem;

        .color-slot {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            flex-grow: 1;
            text-align: center;

            span {
                font-family: "Inter", sans-serif;
                font-weight: 300;
            }


        }
    }
</style>
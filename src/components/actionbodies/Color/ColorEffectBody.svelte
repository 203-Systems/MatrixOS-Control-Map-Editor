<script lang="ts">
    import type { ColorEffectData } from "./ColorEffectData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import {createEventDispatcher} from 'svelte';
    import {ColorEffect} from "./ColorEffect";
    import ColorPicker from "../../common/ColorPicker.svelte";
    import NumericUpDown from "../../common/NumericUpDown.svelte";

    const dispatch = createEventDispatcher();
    export let data: ColorEffectData;

    let rgbData = {
        red: 0,
        green: 0,
        blue: 0,
    }
</script>

<ActionTemplate actionTitle={ColorEffect.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="color-effect-body">
        <ColorPicker bind:rgb={rgbData}/>

        <div class="color-indicators">
            <div class="color-slot">
                <span>Red</span>

                <NumericUpDown bind:value={rgbData.red}></NumericUpDown>
            </div>

            <div class="color-slot">
                <span>Green</span>

                <NumericUpDown bind:value={rgbData.green}></NumericUpDown>
            </div>

            <div class="color-slot">
                <span>Blue</span>

                <NumericUpDown bind:value={rgbData.blue}></NumericUpDown>
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
        gap: 4px;
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
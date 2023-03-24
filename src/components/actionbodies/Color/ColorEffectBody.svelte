<script lang="ts">
    import type { ColorEffectData } from "./ColorEffectData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import {createEventDispatcher} from 'svelte';
    import {ColorEffect} from "./ColorEffect";
    import ColorPicker from "../../common/ColorPicker.svelte";

    const dispatch = createEventDispatcher();
    export let data: ColorEffectData;
</script>

<ActionTemplate actionTitle={ColorEffect.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="color-effect-body">
        <ColorPicker/>
    </div>
</ActionTemplate>

<style lang="scss">
    .color-effect-body {
        width: 100%;
        height: 325px;
        padding: 4px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 4px;
    }
</style>
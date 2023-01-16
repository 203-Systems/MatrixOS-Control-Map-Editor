<script lang="ts">
    import type {KeyboardActionData} from "$lib/types/KeyboardActionData";
    import ActionTemplate from "./ActionTemplate.svelte";
    import Button from "../common/Button.svelte";
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let data: KeyboardActionData;
</script>

<ActionTemplate on:removeAction={() => dispatch('removeAction')}>
    <div class="keyboard-action-body">
        <div class="preview-key-section">
            <div class="key-preview">
                <span>{data.key}</span>
            </div>
        </div>

        <div class="change-key-section">
            <Button text="Select a Keyboard Key"/>
        </div>
    </div>
</ActionTemplate>

<style lang="scss">
    .keyboard-action-body {
        width: 100%;
        padding: 4px 0;
        display: flex;
        flex-direction: column;
        gap: 4px;

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

                box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 4px rgba(0, 0, 0, 0.25);
            }
        }

        .change-key-section {
            height: 40px;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
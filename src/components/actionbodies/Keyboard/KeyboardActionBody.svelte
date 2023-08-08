<script lang="ts">
    import type {KeyboardActionData} from "src/components/actionbodies/Keyboard/KeyboardActionDataeyboard/KeyboardActionData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import Button from "../../common/Button.svelte";
    import {createEventDispatcher} from 'svelte';
    import KeyboardActionPopup from "./KeyboardActionPopup.svelte";
    import {KeyboardAction} from "./KeyboardAction";

    const dispatch = createEventDispatcher();

    export let data: KeyboardActionData;

    let showSelectKeyPopup: boolean = false;
</script>

<ActionTemplate actionTitle={KeyboardAction.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="keyboard-action-body">
        <div class="preview-key-section" on:click={() => showSelectKeyPopup = true}>
            <div class="key-preview">
                {#if data.key === undefined}
                <span >No Key Selected</span>
                {:else}
                <span style="font-size: 20px;">{
                        data.key
                            .replace("VK_", "")
                            .replace("CONTROL", "CTRL")
                            .replace("NUMPAD", "NUM ")
                }</span>
                {/if}
            </div>
        </div>
    </div>
</ActionTemplate>

<KeyboardActionPopup bind:selectedKey={data.key} bind:show={showSelectKeyPopup}/>

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
    }


</style>
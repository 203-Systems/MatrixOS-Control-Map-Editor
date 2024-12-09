<script lang="ts">
    import { Checkmark } from "carbon-icons-svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let checked: boolean
    export let text: string = ""

    function changed(): void {
        checked = !checked
        dispatch('changed', { checked: checked })
    }
</script>

<div class="checkbox-body">
    <div class="checkbox" on:click={() => changed()}>
        <div class="inner-checkbox" class:checked={checked}>
            <Checkmark size={16}/>
        </div>
    </div>

    {#if text !== ""}
        <span>Toggle</span>
    {/if}
</div>

<style lang="scss">
    .checkbox-body {
        display: flex;
        align-items: center;

        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;

        .checkbox {
            width: 28px;
            height: 28px;
            background: white;
            border: 1px solid gray;
            border-radius: 6px;

            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;

            .inner-checkbox {
                width: 28px;
                height: 28px;

                display: flex;
                justify-content: center;
                align-items: center;

                scale: 0.2;
                opacity: 0;

                transition: scale 0.2s ease, opacity 0.2s ease;

                &.checked {
                    scale: 1;
                    opacity: 1;
                }
            }
        }

        span {
            margin-left: 0.6rem;
            font-family: Inter, sans-serif;
        }
    }
</style>


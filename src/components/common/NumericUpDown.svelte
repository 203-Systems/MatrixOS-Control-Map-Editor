<script lang="ts">
    import { ChevronUp, ChevronDown } from "carbon-icons-svelte"

    export let value: number

    export let min: number, max: number

    $: {
        if (value > max) {
            value = max
        }
        else if (value < min) {
            value = min
        }
    }
</script>

<div class="numeric-up-down-body">
    <input type="number" min="{min}" max="{max}" bind:value={value} pattern="[0-9]*" />

    <div class="numeric-up-down-buttons-container">
        <div class="num-button" on:click={() => value += 1}>
            <ChevronUp size={12}/>
        </div>

        <div class="num-button" on:click={() => value -= 1} on:mouse>
            <ChevronDown size={12}/>
        </div>
    </div>
</div>

<style lang="scss">
    .numeric-up-down-body {
        min-width: 60px;
        height: 32px;

        background: white;
        border: 1px solid gray;
        border-radius: 6px;

        display: flex;

        overflow: hidden;

        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;

        input {
            width: 100%;
            outline: 0;
            border: none;
            text-indent: 8px;

            font-family: Inter, sans-serif;
            font-size: 14px;

            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        .numeric-up-down-buttons-container {
            width: 18px;
            flex-shrink: 0;
            background: lightgray;

            cursor: pointer;

            .num-button {
                height: 50%;
                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                    background-color: #b7b7b7;
                }
            }
        }
    }
</style>
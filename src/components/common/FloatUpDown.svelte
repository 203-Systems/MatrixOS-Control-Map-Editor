<script lang="ts">
    import { ChevronUp, ChevronDown } from "carbon-icons-svelte";

    export let value: number;
    export let min: number;
    export let max: number;
    export let step: number = 0.01;

    let inputRef: HTMLInputElement;

    // Utility function to round a number to two decimal places
    function roundToTwo(num: number): number {
        return Math.round(num * 100) / 100;
    }

    $: {
        if (value > max) {
            value = max;
        } else if (value < min) {
            value = min;
        }
        value = roundToTwo(value);
    }

    function increment() {
        value = Math.min(roundToTwo(value + step), max);
    }

    function decrement() {
        value = Math.max(roundToTwo(value - step), min);
    }

    // Whenever value changes, update the input display to show two decimals
    $: if (inputRef && !isNaN(value)) {
        try{ // For some reason type "-" breaks the input
            inputRef.value = value.toFixed(2);
        }
        catch(e){
            console.error(e);
        }
    }
</script>

<div class="numeric-up-down-body">
    <input 
        type="number" 
        min="{min}" 
        max="{max}" 
        step="{step}"
        bind:value={value}
        bind:this={inputRef}
        pattern="[0-9]*"
    />

    <div class="numeric-up-down-buttons-container">
        <div class="num-button" on:click={increment}>
            <ChevronUp size={12} />
        </div>

        <div class="num-button" on:click={decrement}>
            <ChevronDown size={12} />
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

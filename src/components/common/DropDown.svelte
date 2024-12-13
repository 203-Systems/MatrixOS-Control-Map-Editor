<script lang="ts">
    import { ChevronLeft, ChevronDown } from "carbon-icons-svelte";
    import { createEventDispatcher } from 'svelte';

    import {t} from "$lib/translations";

    const dispatch = createEventDispatcher();

    export let options: 
        | Array<string | { key: string; value: string }>
        | { [key: string]: string }
        | Map<string|number, string>;
    export let value: any;

    let dropdownMain: HTMLDivElement;
    let expanded: boolean = false;

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent("outclick"));
                setTimeout(() => expanded = false, 0);
            }
        };

        document.addEventListener("click", handleClick, true);

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true);
            }
        };
    }

    function selectOption(selectedOption: any) {
        value = selectedOption;
        expanded = false;
        dispatch('changed', { option: selectedOption });
    }

    let parsedOptions: { key: number | string; value: string }[] = [];

$: {
    if (options instanceof Map) {
        // For a Map, just keep keys as they are. If they are numeric, they remain numbers.
        parsedOptions = Array.from(options.entries()).map(([k, v]) => ({ key: k, value: v }));
    } else if (Array.isArray(options)) {
        // If it's an array, it can be strings or {key,value} objects
        parsedOptions = options.map((opt) => {
            if (typeof opt === 'string') {
                return { key: opt, value: opt };
            } else {
                // Assuming opt is { key: string|number; value: string }
                return opt;
            }
        });
    } else if (options && typeof options === 'object') {
        // If it's a plain object/dictionary:
        // Attempt to convert keys to numbers if possible to maintain numeric keys.
        parsedOptions = Object.entries(options).map(([k, v]) => {
            const numericKey = Number(k);
            return !isNaN(numericKey) ? { key: numericKey, value: v } : { key: k, value: v };
        });
    } else {
        parsedOptions = [];
    }
}
    function getDisplayValue(selectedValue: any): string {
    if (!parsedOptions || parsedOptions.length === 0) return String(selectedValue);

    const found = parsedOptions.find(option => {
        if (typeof option === 'object') {
            return option.key === selectedValue;
        } else {
            return option === selectedValue;
        }
    });

    if (!found) return String(selectedValue);

    return typeof found === 'object' ? $t(found.value) : $t(found);
}


</script>

<div class="dropdown-body">
    <div class="dropdown-main" bind:this={dropdownMain} on:click={() => expanded = !expanded}>
        <div class="dropdown-selection-display">
            <span>{getDisplayValue(value)}</span>
        </div>

        <div class="dropdown-button">
            {#if expanded}
                <ChevronDown size={12}/>
            {:else}
                <ChevronLeft size={12}/>
            {/if}
        </div>
    </div>

    {#if expanded}
        <div class="option-selector" style="width: {dropdownMain?.clientWidth + 20 || 140}px" use:clickOutside on:outclick={() => expanded = false}>
            {#each parsedOptions as option}
                <div class="selectable-option" on:click={() => selectOption(option.key)}>
                    <span>{$t(option.value)}</span>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .dropdown-body {
        min-width: 120px;
        height: 32px;
        background: white;
        border: 1px solid gray;
        border-radius: 6px;
        user-select: none;

        .dropdown-main {
            height: 32px;
            display: grid;
            grid-template-columns: 1fr 18px;
            cursor: pointer;
            overflow: hidden;

            .dropdown-selection-display {
                display: flex;
                align-items: center;
                padding: 8px 8px; /* Add 8px padding to the left and right */
                font-family: Inter, sans-serif;
                font-size: 14px;
            }

            .dropdown-button {
                background: lightgray;
                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                    background-color: #b7b7b7;
                }
            }
        }

        .option-selector {
            position: fixed;
            margin-top: 6px;
            margin-left: -10px;
            padding: 6px 0;
            max-height: 200px;
            overflow-y: auto;
            background: white;
            border: 1px solid gray;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

            .selectable-option {
                min-height: 28px;
                display: flex;
                align-items: center;
                text-indent: 8px;
                background-color: #efefef;
                cursor: pointer;

                span {
                    font-family: Inter, sans-serif;
                    font-size: 14px;
                }

                &:hover {
                    background-color: #dde5ff;
                }
            }

            &::-webkit-scrollbar {
                width: 10px;
            }

            &::-webkit-scrollbar-track {
                background: #ffffff;
            }

            &::-webkit-scrollbar-thumb {
                padding: 2px;
                background: #b9b9b9;
                border: 2px solid #ffffff;
                border-radius: 8px;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: #8c8c8c;
            }
        }
    }
</style>

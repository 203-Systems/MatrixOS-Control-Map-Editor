<script lang="ts">
    import { ChevronLeft, ChevronDown } from "carbon-icons-svelte";

    export let options: string[]
    export let value: string

    let dropdownMain: HTMLDivElement
    let expanded: boolean = false;

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent("outclick"));

                setTimeout(() => expanded = false, 0)
            }
        };

        document.addEventListener("click", handleClick, true);

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true);
            }
        };
    }

    function selectOption(option: string): void {
        value = option

        expanded = false;
    }
</script>

<div class="dropdown-body">
    <div class="dropdown-main" bind:this={dropdownMain} on:click={() => expanded = !expanded}>
        <div class="dropdown-selection-display">
            <span>{value}</span>
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
        <div class="option-selector" style="width: {dropdownMain.clientWidth + 20}px" use:clickOutside on:outclick={() => expanded = false}>
            {#each options as option}
                <div class="selectable-option" on:click={() => selectOption(option)}>
                    <span>{option}</span>
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
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;

        .dropdown-main {
            height: 32px;
            display: grid;
            grid-template-columns: 1fr 18px;
            cursor: pointer;
            overflow: hidden;

            .dropdown-selection-display {
                display: flex;
                align-items: center;
                text-indent: 8px;

                font-family: Inter, sans-serif;
                font-size: 14px;
            }

            .dropdown-button {
                background: lightgray;

                display: flex;
                justify-content: center;
                align-items: center;
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

            /* width */
            &::-webkit-scrollbar {
                width: 10px;
            }

            /* Track */
            &::-webkit-scrollbar-track {
                background: #ffffff;
            }

            /* Handle */
            &::-webkit-scrollbar-thumb {
                padding: 2px;
                background: #b9b9b9;
                border: 2px solid #ffffff;
                border-radius: 8px;
            }

            /* Handle on hover */
            &::-webkit-scrollbar-thumb:hover {
                background: #8c8c8c;
            }
        }
    }
</style>
<script lang="ts">
    import {ChevronLeft, ChevronRight, Add} from "carbon-icons-svelte";
    import {KeymapEditor} from "$lib/editors/KeymapEditor";
    import {onMount} from "svelte";

    let layerCount: number;
    export let selectedLayer = 0;
    export let editorBackend: KeymapEditor

    function createLayer() {
        editorBackend.createLayer()

        layerCount = editorBackend.getLayerCount()
    }

    function selectLayer(index: number) {
        selectedLayer = index
        editorBackend.selectedLayer = selectedLayer
    }

    function selectOffsetLayer(offset: -1 | 1): void {
        if(offset == -1) {
            if (selectedLayer - 1 >= 0) {
                selectedLayer -= 1
            }
        }
        else {
            if (selectedLayer + 1 < layerCount) {
                selectedLayer += 1
            }
        }

        editorBackend.selectedLayer = selectedLayer
    }

    onMount(() => {
        layerCount = editorBackend.getLayerCount()
    })
</script>

<div class="layer-selector-container">
    <div class="layer-control" on:click={() => selectOffsetLayer(-1)}>
        <ChevronLeft size={24}/>
    </div>

    <div class="layers-container">
        {#each Array(layerCount) as _, layer}
            <div class="layer" on:click={() => selectLayer(layer)} class:selected={selectedLayer === layer}>
                <span>{layer}</span>
            </div>
        {/each}

        <div class="layer-add-button" on:click={createLayer}>
            <Add size={24}/>
        </div>
    </div>

    <div class="layer-control" on:click={() => selectOffsetLayer(1)}>
        <ChevronRight size={24}/>
    </div>
</div>

<style lang="scss">
    .layer-selector-container {
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2em;

        .layer-control {
            width: 36px;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer;
            flex-shrink: 0;

            border: 2px solid gray;

            transition: background-color 0.2s ease;

            &:hover {
                background-color: lightgray;
            }
        }

        .layers-container {
            min-width: fit-content;
            max-width: calc(80px * 6 + 0.5em * 5);
            display: grid;
            justify-content: center;
            grid-template-columns: repeat(auto-fit, 80px);
            gap: 0.5em;

            overflow: hidden;

            .layer {
                width: 80px;
                height: 40px;
                border-radius: 6px;

                background-color: #a6a6a6;
                cursor: pointer;

                display: flex;
                justify-content: center;
                align-items: center;

                flex-shrink: 0;

                span {
                    color: white;
                    font-family: Inter, sans-serif;
                    font-weight: 500;
                }

                &:hover {
                    background-color: #969696;
                }

                &.selected {
                    background-color: #2c2c2c;

                    &:hover {
                        background-color: #232323;
                    }
                }
            }

            .layer-add-button {
                width: 80px;
                height: 40px;
                border-radius: 6px;
                box-sizing: border-box;

                background-color: #dadada;
                border: 1px solid #cecece;
                cursor: pointer;

                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                    background-color: #cecece;
                }
            }
        }
    }
</style>
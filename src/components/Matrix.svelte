<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function getCornerRadius (x: number, y: number) {
        switch (x + y * 10) {
            case 43:
                return "polygon(80% 0, 100% 20%, 100% 100%, 0 100%, 0 0)";
            case 44:
                return "polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%)";
            case 33:
                return "polygon(100% 0, 100% 80%, 80% 100%, 0 100%, 0 0)";
            case 34:
                return "polygon(100% 0, 100% 100%, 20% 100%, 0 80%, 0 0)";
            default:
                return "unset";
        }
    }

    function selectKey(key) {
        dispatch('selectKey', {
            key: key
        });
    }
</script>

<div class="lp-border">
    {#each Array(8) as _, y}
        {#each Array(8) as _, x}
            <div class="matrix-button" on:click={() => selectKey((x + 1) + (8 - y) * 10)} style="clip-path: {getCornerRadius(x, y)}"></div>
        {/each}
    {/each}
</div>

<style lang="scss">
    .lp-border {
        background: rgb(20, 20, 20);
        border: 2px solid rgb(120, 120, 120);
        border-radius: 3%;
        padding: 3%;

        aspect-ratio: 1 / 1;

        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 1.5%;
    }

    .matrix-button {
        width: 92%;
        height: 92%;
        margin: 4%;
        border-radius: 10%;
        background-color: rgb(80, 80, 80);
    }
</style>
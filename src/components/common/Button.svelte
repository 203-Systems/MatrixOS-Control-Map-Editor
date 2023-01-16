<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let text: string
</script>

<button class="custom-button" on:click={() => dispatch('click')}>
    {text}
</button>

<style lang="scss">
    .custom-button {
        min-width: 120px;
        height: 32px;

        background: white;
        border: 1px solid gray;
        border-radius: 6px;

        padding: 0 8px;
        font-family: Inter, sans-serif;
        font-size: 14px;

        cursor: pointer;

        &:hover {
            background: #efefef
        }
    }
</style>
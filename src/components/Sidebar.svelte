<script lang="ts">
    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import AddActionMenu from "./AddActionMenu.svelte";

    export let selectedKey: number = 11;

    let showAddActionMenu: boolean = false;
</script>

<div class="sidebar-body">
    <button class="add-button" on:click={() => showAddActionMenu = true}>
        <Add size={28}></Add>

        <span>Add a Action</span>
    </button>

    <AddActionMenu
        bind:show={showAddActionMenu}
        actions={[

        ]}
    />
</div>

<style lang="scss">
    .sidebar-body {
        display: flex;
        align-items: center;
        flex-direction: column;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        width: 325px;
        height: 100%;
        padding: 12.5px 0;

        background-color: #eff0f3;

        .add-button {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
            width: 300px;
            height: 50px;

            border: 1px solid cornflowerblue;
            background-color: #c7d7f8;
            border-radius: 4px;
            color: #2c2c2c;

            cursor: pointer;

            span {
                font-family: "Roboto Light", sans-serif;
                font-weight: 400;
                font-size: 18px;
            }
        }
    }
</style>
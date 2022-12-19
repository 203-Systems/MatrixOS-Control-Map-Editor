<script lang="ts">
    import Add from "carbon-icons-svelte/lib/Add.svelte";

    export let selectedKey: number = 11;
</script>

<div class="sidebar-body">
    <button class="add-button">
        <Add size={28}></Add>

        <span>Add a Action</span>
    </button>
</div>

<style lang="scss">
    .sidebar-body {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        width: 325px;
        height: 100%;
        padding-top: 12.5px;

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
<script lang="ts">
    import Matrix from "../components/Matrix.svelte";
</script>

<main>
    <div class="matrix-container">

    </div>

    <div class="sidebar-container">

    </div>
</main>

<style lang="scss">
    main {
        display: flex;

        width: 100vw;
        height: 100vh;
    }

    .matrix-container {
        width: calc(100% - 300px);
        height: 100vh;
    }

    .sidebar-container {
        width: 300px;
        height: 100vh;
        background-color: green;
    }
</style>
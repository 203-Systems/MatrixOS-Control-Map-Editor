<script lang="ts">
    import Matrix from "../components/Matrix.svelte";
    import Sidebar from "../components/Sidebar.svelte";
</script>

<main>
    <div class="matrix-container">
        <div style="width: 600px; height: 600px">
            <Matrix></Matrix>
        </div>
    </div>

    <div class="sidebar-container">
        <Sidebar/>
    </div>
</main>

<style lang="scss">
    main {
        display: flex;

        width: 100vw;
        height: 100vh;
    }

    .matrix-container {
        width: calc(100% - 325px);
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sidebar-container {
        width: 325px;
        height: 100vh;
    }
</style>
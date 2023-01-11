<script lang="ts">
    import Matrix from "../components/Matrix.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import { MatrixEditor } from "../lib/editors/MatrixEditor";
    import type {NoteActionData} from "../lib/types/NoteActionData";

    let selectedKey = 11;
    let actionsOnSelectedKey: object[] = []

    let editorBackend = new MatrixEditor()

    $: {
        actionsOnSelectedKey = editorBackend.getActions(selectedKey)
    }

    function addAction(actionIdentifier: string): void {
        switch (actionIdentifier) {
            case "action.note":
                const noteActionData: NoteActionData = {
                    key: 36,
                    velocity: 127,
                    channel: 0
                }

                editorBackend.addAction(selectedKey, actionIdentifier, noteActionData)
                actionsOnSelectedKey = editorBackend.getActions(selectedKey)
                break;

            default:
                console.error("Could not add Action due to lack of implementation for: " + actionIdentifier)
                break;
        }
    }
</script>

<main>
    <div class="matrix-container">
        <div style="width: 600px; height: 600px">
            <Matrix bind:selectedKey={selectedKey}/>
        </div>
    </div>

    <div class="sidebar-container">
        <Sidebar bind:selectedKey={selectedKey} bind:showingActions={actionsOnSelectedKey} on:addAction={e => addAction(e.detail.actionIdentifier)}/>
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
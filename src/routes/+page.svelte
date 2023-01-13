<script lang="ts">
    import Matrix from "../components/Matrix.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import { MatrixEditor } from "../lib/editors/MatrixEditor";
    import type {MidiActionData} from "$lib/types/MidiActionData";

    let selectedKey = 11;
    let actionsOnSelectedKey: object[] = []

    let editorBackend = new MatrixEditor()

    function refreshActionDisplay(): void {
        actionsOnSelectedKey = editorBackend.getActions(selectedKey)
    }

    $: {
        selectedKey; // Mentioning selectedKey in here makes this reactive function run on every change of it

        refreshActionDisplay()
    }

    function addAction(actionIdentifier: string): void {
        switch (actionIdentifier) {
            case "action.note":
                const noteActionData: MidiActionData = {
                    type: "NOTE",
                    key: 36,
                    velocity: 127,
                    channel: 1
                }

                editorBackend.addAction(selectedKey, actionIdentifier, noteActionData)
                break;

            default:
                console.error("Could not add Action due to lack of implementation for: " + actionIdentifier)
                break;
        }

        refreshActionDisplay()
    }

    function removeAction(actionIndex: number): void {
        editorBackend.removeAction(selectedKey, actionIndex)

        refreshActionDisplay()
    }
</script>

<main>
    <div class="matrix-container">
        <div style="width: 600px; height: 600px">
            <Matrix bind:selectedKey={selectedKey}/>
        </div>
    </div>

    <div class="sidebar-container">
        <Sidebar
                bind:selectedKey={selectedKey}
                bind:showingActions={actionsOnSelectedKey}
                on:addAction={e => addAction(e.detail.actionIdentifier)}
                on:removeAction={e => removeAction(e.detail.index)}
        />
    </div>
</main>

<style lang="scss">
    main {
        display: grid;
        grid-template-columns: 1fr 325px;

        width: 100vw;
        height: 100vh;
    }

    .matrix-container {
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sidebar-container {
        height: 100vh;
    }
</style>
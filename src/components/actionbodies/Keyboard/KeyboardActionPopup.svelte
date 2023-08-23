<script lang="ts">
    import Popup from "../../common/Popup.svelte";
    import {KeyboardScanCode, KeyboardScanCodeFriendlyName} from "./ScanCode";
    import Button from "../../common/Button.svelte";

    export let show: boolean
    export let selectedKey: KeyboardScanCode

    function createNumberArray(start: number, end: number) {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }

    let keyPages = [
        {
            title: "Basic",
            keyCollections: [
                { title: "Letters", keys: createNumberArray(KeyboardScanCode.KEY_A, KeyboardScanCode.KEY_Z) },
                { title: "Numbers", keys: createNumberArray(KeyboardScanCode.KEY_1, KeyboardScanCode.KEY_0)  },
                { title: "Mods", keys: createNumberArray(KeyboardScanCode.KEY_LEFT_CTRL, KeyboardScanCode.KEY_RIGHT_GUI) },
                { title: "Edit", keys: [KeyboardScanCode.KEY_INSERT, KeyboardScanCode.KEY_DELETE, KeyboardScanCode.KEY_BACKSPACE, KeyboardScanCode.KEY_CLEAR, KeyboardScanCode.KEY_RETURN, KeyboardScanCode.KEY_ESC]},
                { title: "Move", keys: [KeyboardScanCode.KEY_HOME, KeyboardScanCode.KEY_END, KeyboardScanCode.KEY_LEFT, KeyboardScanCode.KEY_UP, KeyboardScanCode.KEY_RIGHT, KeyboardScanCode.KEY_DOWN]},
                { title: "Numpad", keys: createNumberArray(KeyboardScanCode.KEYPAD_1, KeyboardScanCode.KEYPAD_DOT).concat(createNumberArray(KeyboardScanCode.KEYPAD_DIVIDE, KeyboardScanCode.KEYPAD_ENTER))}
            ]
        }
    ]
</script>

<Popup title="Select a Keyboard Key" bind:show={show}>
    <div class="key-selector-popup">
        <div class="key-view-grid">
            {#each keyPages[0].keyCollections as keyCollection}
                <div class="key-collection-title-container">
                    <div style="height: 58px; line-height: 58px;">
                        <span>{keyCollection.title}</span>
                    </div>
                </div>

                <div class="key-collection-container">
                    {#each keyCollection.keys as key}
                        <div class="keyboard-key" on:click={() => {selectedKey = key; show = false}} class:selected-key={selectedKey === key}>
                            <span>{
                                KeyboardScanCodeFriendlyName[key]
                            }</span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>

        <div class="bottom-bar">
            <Button text="Close" on:click={() => show = false}/>
        </div>
    </div>
</Popup>

<style lang="scss">
    .key-selector-popup {
        .bottom-bar {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 1rem;
        }

        .key-view-grid {
            max-height: 50vh;
            overflow-y: auto;
            display: grid;
            grid-template-columns: 100px 1fr;
            gap: 20px 8px;
            margin-top: 2rem;


            .key-collection-title-container {
                text-align: end;
                padding-right: 12px;

                span {
                    font-family: Inter, sans-serif;
                    font-size: 18px;
                    font-weight: 600;
                }
            }

            .key-collection-container {
                display: grid;
                grid-template-columns: repeat(14, 60px);
                gap: 10px;
                padding-right: 8px;

                .keyboard-key {
                    width: 60px;
                    height: 60px;
                    padding: 4px;
                    background-color: white;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font-family: Inter, sans-serif;
                    font-size: 14px;
                    font-weight: 600;

                    box-sizing: border-box;
                    border: 1px solid gray;
                    border-radius: 4px;

                    cursor: pointer;

                    overflow-wrap: anywhere;
                    text-align: center;

                    span {
                        cursor: pointer;

                    }

                    &:hover {
                        background-color: #ececec;
                    }

                    &.selected-key {
                        border: 1px solid cornflowerblue;
                        background-color: #ccdfff;

                        &:hover {
                            background-color: #b1cbf5;
                        }
                    }
                }
            }
        }
    }
</style>
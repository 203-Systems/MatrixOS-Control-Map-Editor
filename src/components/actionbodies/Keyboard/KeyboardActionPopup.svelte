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
                { title: "Alphabet", keys: createNumberArray(KeyboardScanCode.KEY_A, KeyboardScanCode.KEY_Z) },
                { title: "Numeric", keys: createNumberArray(KeyboardScanCode.KEY_1, KeyboardScanCode.KEY_0) },
                { title: "Control",  keys: [ KeyboardScanCode.KEY_ENTER, KeyboardScanCode.KEY_ESC, KeyboardScanCode.KEY_BACKSPACE, KeyboardScanCode.KEY_TAB, KeyboardScanCode.KEY_CAPS_LOCK, KeyboardScanCode.KEY_NUM_LOCK, KeyboardScanCode.KEY_SCROLL_LOCK, KeyboardScanCode.KEY_PAUSE, KeyboardScanCode.KEY_DELETE, KeyboardScanCode.KEY_INSERT, KeyboardScanCode.KEY_HOME, KeyboardScanCode.KEY_END, KeyboardScanCode.KEY_PAGE_UP, KeyboardScanCode.KEY_PAGE_DOWN] },
                { title: "Navigation", keys: [KeyboardScanCode.KEY_UP_ARROW, KeyboardScanCode.KEY_DOWN_ARROW, KeyboardScanCode.KEY_LEFT_ARROW, KeyboardScanCode.KEY_RIGHT_ARROW] },
                { title: "Function", keys: createNumberArray(KeyboardScanCode.KEY_F1, KeyboardScanCode.KEY_F12) },
                { title: "Character", keys: [ KeyboardScanCode.KEY_SPACE, KeyboardScanCode.KEY_MINUS, KeyboardScanCode.KEY_EQUAL, KeyboardScanCode.KEY_LEFT_BRACE, KeyboardScanCode.KEY_RIGHT_BRACE, KeyboardScanCode.KEY_BACKSLASH, KeyboardScanCode.KEY_SEMICOLON, KeyboardScanCode.KEY_QUOTE, KeyboardScanCode.KEY_TILDE, KeyboardScanCode.KEY_COMMA, KeyboardScanCode.KEY_PERIOD, KeyboardScanCode.KEY_SLASH] },
                { title: "Keypad", keys: createNumberArray(KeyboardScanCode.KEYPAD_1, KeyboardScanCode.KEYPAD_0).concat(createNumberArray(KeyboardScanCode.KEYPAD_DIVIDE, KeyboardScanCode.KEYPAD_ENTER)).concat([KeyboardScanCode.KEYPAD_DOT]) },
                { title: "System", keys: [KeyboardScanCode.KEY_PRINT, KeyboardScanCode.KEY_APPLICATION] },
                { title: "Modifier", keys: [KeyboardScanCode.KEY_LEFT_CTRL, KeyboardScanCode.KEY_LEFT_SHIFT, KeyboardScanCode.KEY_LEFT_ALT, KeyboardScanCode.KEY_LEFT_GUI, KeyboardScanCode.KEY_RIGHT_CTRL, KeyboardScanCode.KEY_RIGHT_SHIFT, KeyboardScanCode.KEY_RIGHT_ALT, KeyboardScanCode.KEY_RIGHT_GUI] },
                { title: "Custom", keys: [KeyboardScanCode.KEY_USER_DEFINED] }
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
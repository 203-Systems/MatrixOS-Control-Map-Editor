<script lang="ts">
    import Popup from "../../common/Popup.svelte";
    import {GamepadKeycode, GamepadKeycodeFriendlyName} from "./GamepadActionData";
    import Button from "../../common/Button.svelte";

    import {t} from "$lib/translations";

    export let show: boolean
    export let selectedKey: GamepadKeycode

    function createNumberArray(start: number, end: number) {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }

    let keyPages = [
        {
            title: "Basic",
            keyCollections: [
                { title: "gamepad.buttons", keys: createNumberArray(GamepadKeycode.GAMEPAD_1, GamepadKeycode.GAMEPAD_32) },
                { title: "gamepad.dpad", keys: [GamepadKeycode.GAMEPAD_DPAD] },
                { title: "gamepad.axes", keys: createNumberArray(GamepadKeycode.GAMEPAD_X_AXIS, GamepadKeycode.GAMEPAD_RZ_AXIS) },
           ]
        }
    ]
</script>

<Popup title={$t("gamepad.select_a_key")} bind:show={show}>
    <div class="key-selector-popup">
        <div class="key-view-grid">
            {#each keyPages[0].keyCollections as keyCollection}
                <div class="key-collection-title-container">
                    <div style="height: 58px; line-height: 58px;">
                        <span>{$t(keyCollection.title)}</span>
                    </div>
                </div>

                <div class="key-collection-container">
                    {#each keyCollection.keys as key}
                        <div class="gamepad-key" on:click={() => {selectedKey = key; show = false}} class:selected-key={selectedKey === key}>
                            <span>{
                                $t(GamepadKeycodeFriendlyName[key])
                            }</span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>

        <div class="bottom-bar">
            <Button text={$t("gamepad.close")} on:click={() => show = false}/>
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

                .gamepad-key {
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
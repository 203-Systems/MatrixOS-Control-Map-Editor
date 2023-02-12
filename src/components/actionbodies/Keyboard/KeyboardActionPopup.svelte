<script lang="ts">
    import Popup from "../../common/Popup.svelte";
    import {VirtualKey} from "./VirtualKeys";
    import Button from "../../common/Button.svelte";

    export let show: boolean

    export let selectedKey: VirtualKey

    function getAllKeysByRegex(regex: RegExp): VirtualKey[] {
        let virtualKeys = Object.keys(VirtualKey).filter(virtualKey => {
            if(virtualKey.startsWith("VK")) {
                return virtualKey
            }
        })

        return virtualKeys.map(virtualKey => {
            if(regex.test(virtualKey)) {
                return VirtualKey[virtualKey]
            }
        }).filter(virtualKeys => virtualKeys !== undefined)
    }

    let keyPages = [
        {
            title: "Basic",
            keyCollections: [
                { title: "Letters", keys: getAllKeysByRegex(/^VK_[A-Z]$/) },
                { title: "Numbers", keys: getAllKeysByRegex(/^VK_[0-9]$/) },
                { title: "Mods", keys: getAllKeysByRegex(/^VK_(SHIFT|CONTROL|MENU|LWIN|RWIN|APPS)$/) },
                { title: "Edit", keys: getAllKeysByRegex(/^VK_(INSERT|DELETE|BACK|CLEAR|RETURN|ESCAPE)$/) },
                { title: "Move", keys: getAllKeysByRegex(/^VK_(PRIOR|NEXT|HOME|END|LEFT|UP|RIGHT|DOWN)$/) },
                { title: "Numpad", keys: getAllKeysByRegex(/^VK_(NUMPAD[0-9]|(DECIMAL|ADD|SUBTRACT|MULTIPLY|DIVIDE))$/) }
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
                        <div class="keyboard-key" on:click={() => selectedKey = VirtualKey[key]} class:selected-key={selectedKey === VirtualKey[key]}>
                            <span>{
                                VirtualKey[key]
                                    .replace("VK_", "")
                                    .replace("CONTROL", "CTRL")
                                    .replace("NUMPAD", "NUM ")
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
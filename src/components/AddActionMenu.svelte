<script lang="ts">
    import type { Action } from "../lib/types/Action";
    import { Keyboard, Music } from "carbon-icons-svelte";
    import { createEventDispatcher } from 'svelte';

    export let show: boolean = false;
    let onEffectTab: boolean = false;
    const dispatch = createEventDispatcher();

    let actions: Action[] = [
        { actionName: "Play a Midi Note", actionIdentifier: "action.note", carbonIcon: Music },
        { actionName: "Simulate Keyboard Key", actionIdentifier: "action.keyboard", carbonIcon: Keyboard },
    ];

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent("outclick"));

                setTimeout(() => show = false, 0) // This way, the UI even hides if the Enabling Button was clicked to hide it again
            }
        };

        document.addEventListener("click", handleClick, true);

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true);
            }
        };
    }

    function addAction(action: Action): void {
        dispatch('addAction', {
            actionIdentifier: action.actionIdentifier
        });

        show = false;
    }
</script>

{#if show}
    <div class="menu-container" use:clickOutside on:outclick={() => (show = false)}>
        <div class="menu-tab-selector">
            <div class="menu-tab-names">
                <div class="menu-tab-name-container" on:click={() => onEffectTab = false}>
                    <span>Actions</span>
                </div>
                <div class="menu-tab-name-container" on:click={() => onEffectTab = true}>
                    <span>Effects</span>
                </div>
            </div>

            <div class="menu-tab-underline-tray">
                <div class="menu-tab-underline" class:on-effect-tab={onEffectTab}></div>
            </div>
        </div>

        <div class="menu-action-list">
            {#if !onEffectTab}
                {#each actions as action}
                    <div class="menu-action-item" on:click={() => addAction(action)}>
                        <div class="icon-section">
                            <svelte:component this={action.carbonIcon} size={24}/>
                        </div>

                        <div class="label-section">
                            <span>{action.actionName}</span>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
{/if}

<style lang="scss">
    .menu-container {
        width: 300px;
        max-height: 325px;
        border-radius: 8px;
        border: 1px solid lightgray;
        filter: drop-shadow(1px 2px 2px #818181);

        margin-top: 20px;
        background-color: white;

        display: flex;
        gap: 10px;
        flex-direction: column;

        &::before {
            content: ' ';
            position: fixed;

            margin-left: calc(50% - 10px);
            margin-top: -10px;
            width: 20px;
            height: 20px;

            transform: rotateZ(45deg);

            border-left: 1px solid lightgray;
            border-top: 1px solid lightgray;
            border-top-left-radius: 2px;
            background-color: white;
        }

        .menu-tab-selector {
            padding-top: 6px;
            height: 32px;

            .menu-tab-names {
                height: 28px;
                display: flex;
                align-items: center;

                .menu-tab-name-container {
                    display: flex;
                    justify-content: center;
                    width: 100%;

                    cursor: pointer;

                    span {
                        font-family: "Roboto", sans-serif;

                        user-select: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                    }
                }
            }

            .menu-tab-underline-tray {
                height: 4px;

                .menu-tab-underline {
                    width: 80px;
                    height: 4px;
                    border-radius: 2px;
                    background-color: cornflowerblue;

                    margin-left: 35px;

                    transition: margin-left 0.2s ease, width 0.1s ease;

                    &.on-effect-tab {
                        width: 75px;
                        margin-left: 188px;
                    }
                }
            }
        }

        .menu-action-list {
            width: 100%;
            height: 100%;

            overflow-x: hidden;
            overflow-y: auto;

            display: flex;
            flex-direction: column;
            gap: 10px;

            box-sizing: border-box;
            padding: 0 8px 8px;

            .menu-action-item {
                height: 50px;
                width: 100%;
                display: flex;

                background: #dde8fd;
                border-radius: 4px;

                cursor: pointer;

                &:hover {
                    background: #c8dbfa;
                }

                .icon-section {
                    height: 100%;
                    aspect-ratio: 1/1;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .label-section {
                    width: 100%;

                    display: flex;
                    align-items: center;
                    text-indent: 10px;

                    font-family: "Roboto", sans-serif;

                    user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    -moz-user-select: none;
                }
            }
        }
    }
</style>
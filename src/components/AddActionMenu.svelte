<script lang="ts">
    export let show: boolean = false;
    export let actions: { actionName: string, actionFunction: void }[] = [];

    let onEffectTab: boolean = false;

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent("outclick"));
            }
        };

        document.addEventListener("click", handleClick, true);

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true);
            }
        };
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
    </div>
{/if}

<style lang="scss">
    .menu-container {
        width: 300px;
        height: 325px;
        border-radius: 8px;
        border: 1px solid lightgray;
        filter: drop-shadow(1px 2px 2px #818181);

        margin-top: 20px;
        background-color: white;

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
    }
</style>
<script lang="ts">
    export let show: boolean = false;
    export let title: string = ""

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent("outclick"));

                setTimeout(() => show = false, 0)
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
    <div class="popup-background">
        <div class="popup-body" use:clickOutside on:outclick={() => (show = false)}>
            {#if title !== ""}
                <div class="popup-header">
                    <span>{title}</span>
                </div>
            {/if}

            <div class="popup-content">
                <slot></slot>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .popup-background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;

        width: 100vw;
        height: 100vh;

        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);

        display: flex;
        justify-content: center;
        align-items: center;

        .popup-body {
            padding: 28px;
            border-radius: 16px;
            background-color: white;
            filter: drop-shadow(0 0 12px black);

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .popup-header {
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    font-family: Inter, sans-serif;
                    font-size: 1.4rem;
                }
            }
        }
    }
</style>
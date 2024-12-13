<script lang="ts">
    export let show: boolean = false;
    export let title: string = ""
    export let closeable: boolean = true;
    export let updateCount: number = 0;

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

<div 
    class="popup-background {show ? 'animate' : ''}" 
    style="pointer-events: {show ? 'auto' : 'none'}">
    {#if show}
        <div class="popup-body" 
            use:clickOutside on:outclick={() => (closeable && (show = false))}>
            {#if title !== ""}
                <div class="popup-header">
                    <span>{title}</span>
                </div>
            {/if}

            <div class="popup-content">
                <slot></slot>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .popup-background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;

        width: 100vw;
        height: 100vh;

        background: rgba(0, 0, 0, 0); /* Start with no background */
        backdrop-filter: blur(0px); /* Start with no blur */

        display: flex;
        justify-content: center;
        align-items: center;

        transition: background 0.3s, backdrop-filter 0.1s;

        &.animate {
            background: rgba(0, 0, 0, 0.5); /* Final background */
            backdrop-filter: blur(4px); /* Final blur */
        }

        /* Ensure it doesn’t block clicks when pointer-events: none */
        pointer-events: none;

        &.animate {
            pointer-events: auto; /* Enable interaction only when animated */
        }
    }

    .popup-body {
        padding: 28px;
        border-radius: 16px;
        background-color: white;
        filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.25));

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
                font-size: 1.6rem;
            }
        }
    }
</style>

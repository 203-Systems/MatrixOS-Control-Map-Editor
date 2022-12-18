<script lang="ts">
    function getCornerRadius (x: number, y: number) {
        switch (x + y * 10) {
            case 43:
                return "polygon(80% 0, 100% 20%, 100% 100%, 0 100%, 0 0)";
            case 44:
                return "polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%)";
            case 33:
                return "polygon(100% 0, 100% 80%, 80% 100%, 0 100%, 0 0)";
            case 34:
                return "polygon(100% 0, 100% 100%, 20% 100%, 0 80%, 0 0)";
            default:
                return "unset";
        }
    }
</script>

<div class="lp-border">
    <div class="lp-controls">
        {#each Array(8) as _, y}
            <div class="lp-controls-row">
                {#each Array(8) as _2, x}
                    <div class="lp-btn-parent">
                        {#if (x >= 0 && x < 9) && (y >= 0 && y < 9)}
                            <div class="lp-normal-btn" style="clip-path: {getCornerRadius(x, y)};"/>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .lp-border {
        background: rgb(20, 20, 20);
        border: 2px solid rgb(120, 120, 120);
        border-radius: 3%;
        position: relative;
        width: 100%;
        aspect-ratio: 1/1;
    }
    .lp-controls {
        height: 100%;
        width: 100%;
        display: flex;
        gap: 1.5%;
        flex-direction: column;
        padding: 3%;
        .lp-controls-row {
            height: 100%;
            display: flex;
            gap: 1.5%;
        }
        .lp-btn-parent {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            :global(.lp-normal-btn) {
                padding: 0;
                border: none;
                height: 92%;
                width: 92%;
                border-radius: 10%;
                background-color: rgb(80, 80, 80);
            }
        }
    }
</style>
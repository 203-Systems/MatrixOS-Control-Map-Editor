<script lang="ts">
    export let rgb = {
        red: 255,
        green: 0,
        blue: 0,
    };

    let pickerData = {
        hue: 360,
        saturation: 100,
        lightness: 50
    }

    function setHSLByOnscreenPct(percentX, percentY) {
        pickerData.saturation = percentX * 100;

        pickerData.lightness = (1 - percentY) * 100 - (percentX * (50 - 50 * percentY))
    }

    function pickerMouseDown(event: MouseEvent): void {
        let pickerFieldSize = event.target.clientWidth

        let pctX = (event.offsetX < 0? 0 : event.offsetX > pickerFieldSize? pickerFieldSize : event.offsetX) / pickerFieldSize
        let pctY = (event.offsetY < 0? 0 : event.offsetY > pickerFieldSize? pickerFieldSize : event.offsetY) / pickerFieldSize

        setHSLByOnscreenPct(pctX, pctY)
    }

    function pickerMouseMove(event: MouseEvent): void {
        if (event.buttons) {
            let pickerFieldSize = event.target.clientWidth

            let pctX = (event.offsetX < 0? 0 : event.offsetX > pickerFieldSize? pickerFieldSize : event.offsetX) / pickerFieldSize
            let pctY = (event.offsetY < 0? 0 : event.offsetY > pickerFieldSize? pickerFieldSize : event.offsetY) / pickerFieldSize

            setHSLByOnscreenPct(pctX, pctY)
        }
    }

    function hueMouseDown(event: MouseEvent): void {
        let hueElementWidth = event.target.clientWidth

        let calculatedHue = event.offsetX / hueElementWidth * 360

        pickerData.hue = calculatedHue < 0 ? 0 : calculatedHue > 360 ? 360 : calculatedHue
    }

    function hueMouseMove(event: MouseEvent) {
        if (event.buttons) {
            let hueElementWidth = event.target.clientWidth

            let calculatedHue = event.offsetX / hueElementWidth * 360

            pickerData.hue = calculatedHue < 0 ? 0 : calculatedHue > 360 ? 360 : calculatedHue
        }
    }

    function RGBtoHSL(rgb: object) {

    }

    function HSLtoRGB(hsl: object) {
        const [h, s, l] = hsl;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const hp = h / 60;
        const x = c * (1 - Math.abs(hp % 2 - 1));
        const m = l - c / 2;
        const [r, g, b] = hp >= 0 && hp < 1 ? [c, x, 0] :
            hp >= 1 && hp < 2 ? [x, c, 0] :
                hp >= 2 && hp < 3 ? [0, c, x] :
                    hp >= 3 && hp < 4 ? [0, x, c] :
                        hp >= 4 && hp < 5 ? [x, 0, c] :
                            [c, 0, x];

        return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
    }

    $: {

    }
</script>

<div class="color-picker-container">
    <div class="color-picker-body"
         on:mousedown={pickerMouseDown}
         on:mousemove={pickerMouseMove}
         style="
            --saturation: {pickerData.saturation};
            --lightness: {pickerData.lightness};
            --hue: {pickerData.hue};
         "
    >
        <div
                class="saturation-layer"
                style="background: linear-gradient(90deg, rgba(0, 0, 0, 0), hsl({pickerData.hue} 100% 50%));"
        ></div>

        <div class="brightness-layer"></div>
    </div>

    <div class="color-picker-hue-selector"
         on:mousedown={hueMouseDown}
         on:mousemove={hueMouseMove}
         style="--hue: {pickerData.hue}"
    ></div>
</div>

<style lang="scss">
    .color-picker-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        gap: 8px;
    }

    .color-picker-body {
        width: 255px;
        height: 255px;

        background-color: white;
        border: 2px solid white;
        box-shadow: 0 0 2px 0 gray;
        border-radius: 2px;

        &::after {
            content: ' ';
            position: absolute;

            $picker-size: 255px;

            margin-left: calc((var(--saturation) / 100) * #{$picker-size} - 9px);

            // Mind you that this doesnt really work yet so i will probably remake this in js
            margin-top: max(calc((100 - var(--lightness)) / 100 * #{$picker-size} - (var(--saturation) / 100 * (var(--lightness) / 100 * #{$picker-size})) - 9px), -9px);


            width: 18px;
            height: 18px;

            border: 2px solid white;
            border-radius: 50%;

            cursor: grab;

            background: hsl(var(--hue) calc(var(--saturation) * 1%) calc(var(--lightness) * 1%));
        }

        .brightness-layer {
            position: absolute;

            width: 255px;
            height: 255px;

            background: linear-gradient(0deg, #000, rgba(255, 255, 255, 0));
            border-radius: 2px;
        }

        .saturation-layer {
            position: absolute;

            width: 255px;
            height: 255px;

            border-radius: 2px;
        }
    }

    .color-picker-hue-selector {
        width: 255px;
        height: 14px;

        border-radius: 2px;

        background: linear-gradient(
                        270deg,
                        hsl(360 100% 50%),
                        hsl(315 100% 50%),
                        hsl(270 100% 50%),
                        hsl(225 100% 50%),
                        hsl(180 100% 50%),
                        hsl(135 100% 50%),
                        hsl(90 100% 50%),
                        hsl(45 100% 50%),
                        hsl(0 100% 50%)
        );

        &::after {
            content: ' ';
            position: absolute;
            margin-left: calc(-4px + (var(--hue) / 360 * 255) * 1px);
            margin-top: -3px;

            width: 8px;
            height: 18px;

            border: 1px solid white;
            border-radius: 4px;

            cursor: grab;

            background: hsl(var(--hue) 100% 50%)
        }
    }
</style>
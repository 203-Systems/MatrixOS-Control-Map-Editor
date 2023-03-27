export function rgb_to_pct(red: number, green: number, blue: number): [number, number, number] {
    return [red / 255, green / 255, blue / 255]
}

export function hsl_to_rgb(hue: number, saturation: number, lightness: number): [number, number, number] {
    saturation /= 100;
    lightness /= 100;

    let chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    let hue_prime = hue / 60;
    let x = chroma * (1 - Math.abs(hue_prime % 2 - 1));
    let r, g, b;

    if (hue_prime >= 0 && hue_prime <= 1) {
        r = chroma;
        g = x;
        b = 0;
    } else if (hue_prime > 1 && hue_prime <= 2) {
        r = x;
        g = chroma;
        b = 0;
    } else if (hue_prime > 2 && hue_prime <= 3) {
        r = 0;
        g = chroma;
        b = x;
    } else if (hue_prime > 3 && hue_prime <= 4) {
        r = 0;
        g = x;
        b = chroma;
    } else if (hue_prime > 4 && hue_prime <= 5) {
        r = x;
        g = 0;
        b = chroma;
    } else if (hue_prime > 5 && hue_prime <= 6) {
        r = chroma;
        g = 0;
        b = x;
    } else {
        r = 0;
        g = 0;
        b = 0;
    }

    let m = lightness - chroma / 2;

    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

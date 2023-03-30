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

export function rgb_to_hsl(red: number, green: number, blue: number): [number, number, number] {
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const lightness = (max + min) / 2;

    if (max === min) {
        return [0, 0, lightness * 100];
    }

    let saturation;
    if (lightness < 0.5) {
        saturation = (max - min) / (max + min);
    } else {
        saturation = (max - min) / (2 - max - min);
    }
    saturation *= 100;

    let hue;
    if (max === r) {
        hue = (g - b) / (max - min);
    } else if (max === g) {
        hue = 2 + (b - r) / (max - min);
    } else {
        hue = 4 + (r - g) / (max - min);
    }
    hue *= 60;
    if (hue < 0) {
        hue += 360;
    }

    return [hue, saturation, lightness * 100];
}

export interface RadixColor {
  name: string;
  value: string;
  scale: string;
  step: number;
}

export function createPalettes(...args: Record<string, string>[]) {
  const colors = [...args].map(palette => {
    return Object.keys(palette).map(key => {
      // separate text and number from key
      const [scale, step] = getScaleAndStep(key)
      return {
        name: `${scale} ${step}`,
        value: palette[key],
        scale,
        step
      } as RadixColor
    })
  }).flat()

  const availablePalettes = [...args].map(palette => getScaleAndStep(Object.keys(palette)[0])[0])

  return { colors, availablePalettes }
}

function getScaleAndStep(str: string) {
  const [, scale, step] = str.match(/([a-zA-Z]+)(\d+)/) as string[]
  return [scale, Number(step)];
}



// Convert hex to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Convert RGB to LAB
function rgbToLab(rgb: { r: number; g: number; b: number }) {
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  r *= 100;
  g *= 100;
  b *= 100;

  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  const l = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  const a = 500 * ((x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116) - l);
  const b_ = 200 * (l - (z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116));

  return { l: (116 * l) - 16, a, b: b_ };
}

// Calculate color difference using Delta E
function calculateDeltaE(lab1: { l: number; a: number; b: number }, lab2: { l: number; a: number; b: number }) {
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;

  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

// Find the closest color
export function findClosestColorInPalette(inputColor: string, palette: RadixColor[]): RadixColor {
  const inputRgb = hexToRgb(inputColor);
  if (!inputRgb) return palette[0];

  const inputLab = rgbToLab(inputRgb);

  let closestColor = palette[0];
  let minDistance = Infinity;

  for (const color of palette) {
    const colorRgb = hexToRgb(color.value);
    if (!colorRgb) continue;

    const colorLab = rgbToLab(colorRgb);
    const distance = calculateDeltaE(inputLab, colorLab);

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }

  return closestColor;
}

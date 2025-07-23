import { findClosestColorInPalette, RadixColor } from './helper';
import { radixPalette } from './radix-palette';

// Find the closest color
export function findClosestRadixColor(inputColor: string): RadixColor {
  return findClosestColorInPalette(inputColor, radixPalette);
}

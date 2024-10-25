import { amber, bronze, brown, crimson, cyan, gold, grass, gray, green, indigo, jade, lime, mauve, mint, olive, orange, pink, plum, purple, red, ruby, sage, sand, sky, slate, teal, tomato, violet, yellow } from './light';

export interface RadixColor {
  name: string;
  value: string;
  scale: string;
  step: number;
}

function createPalettes(...args: Record<string, string>[]) {
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

// const palettes = { gray, mauve, slate, sage, olive, sand, tomato, red, ruby, crimson, pink, plum, purple, violet, indigo, cyan, teal, jade, green, grass, brown, bronze, gold, sky, mint, lime, yellow, amber, orange }
// const palettesNames = Object.keys(palettes)

const { colors } = createPalettes(gray, mauve, slate, sage, olive, sand, tomato, red, ruby, crimson, pink, plum, purple, violet, indigo, cyan, teal, jade, green, grass, brown, bronze, gold, sky, mint, lime, yellow, amber, orange)
export const radixColors: RadixColor[] = colors

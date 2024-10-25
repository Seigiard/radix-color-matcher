import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'
import { RadixColor } from './lib/radix-colors'

export const $input = persistentAtom<string>('inputColor', '#000000')
export const $matchedColor = atom<RadixColor | null>(null)

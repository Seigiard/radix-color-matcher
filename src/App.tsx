import { $input, $matchedColor } from '@/store'
import { useStore } from '@nanostores/react'
// import { websitePalette as palette } from './lib/website-palette'
import { radixPalette as palette } from './lib/radix-palette'
import { findClosestColorInPalette } from './lib/helper'

$input.subscribe((value) => {
  $matchedColor.set(findClosestColorInPalette(value, palette))
})

const handlePaste = (event?: ClipboardEvent | FocusEvent) => {
  navigator.clipboard
    .readText()
    .then((text) => {
      if (text) {
        $input.set(text)
      }
    })
    .catch((err) => {
      console.error(err)

      if (!event) return
      // Access clipboard data
      // @ts-expect-error window clipboardData is not typed
      const clipboardData = event?.clipboardData || window?.clipboardData
      const pastedText = clipboardData.getData('text')
      if (pastedText) {
        $input.set(pastedText)
      }
    })
}

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    handlePaste()
  }
}

document.addEventListener('paste', handlePaste)
document.addEventListener('visibilitychange', handleVisibilityChange)

function App() {
  const input = useStore($input)
  const matchedColor = useStore($matchedColor)

  return (
    <div className="layout-container">
      <main className="app">
        <hgroup>
          <h1>Color Matcher</h1>
          <p>Find the closest color to your hex code</p>
        </hgroup>
        <form action="">
          <fieldset>
            <label htmlFor="color-picker">Your Color</label>
            <input
              type="color"
              id="color-picker"
              name="color"
              value={input}
              onChange={(e) => $input.set(e.target.value)}
            />
            <input
              type="text"
              id="color"
              name="color"
              value={input}
              onChange={(e) => $input.set(e.target.value)}
              placeholder="#000000"
            />
            <p>
              Press <kbd>Ctrl+V</kbd> anywhere on the page to paste a color from
              your clipboard
            </p>
          </fieldset>
        </form>
        {matchedColor && (
          <div className="closest-color">
            <h2>Closest Radix Color</h2>
            <div className="color-info">
              <div
                className="color-showcase"
                style={{ backgroundColor: matchedColor.value }}
              ></div>
              <h3>{matchedColor.name}</h3>
              <p className="value">{matchedColor.value}</p>
              <p className="scale">
                {matchedColor.scale} scale{' '}
                <small>(step {matchedColor.step})</small>
              </p>
            </div>
            <div className="color-comparison">
              <div
                className="color-showcase"
                style={{ backgroundColor: input }}
              ></div>
              <div
                className="color-showcase"
                style={{ backgroundColor: matchedColor.value }}
              ></div>
            </div>
          </div>
        )}
      </main>

      <section className="palette-display">
        <h2>Available Colors</h2>
        <div className="palette-grid">
          {Object.entries(
            palette.reduce(
              (acc, color) => {
                if (!acc[color.scale]) {
                  acc[color.scale] = []
                }
                acc[color.scale].push(color)
                return acc
              },
              {} as Record<string, typeof palette>
            )
          ).map(([scaleName, colors]) => (
            <div key={scaleName} className="palette-scale">
              <h3>{scaleName}</h3>
              <div className="color-swatches">
                {colors
                  .sort((a, b) => a.step - b.step)
                  .map((color) => (
                    <div
                      key={color.name}
                      className="color-swatch"
                      style={{ backgroundColor: color.value }}
                      title={`${color.name}: ${color.value}`}
                      onClick={() => $input.set(color.value)}
                    >
                      <span className="step-number">{color.step}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App

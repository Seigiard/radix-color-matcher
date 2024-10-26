import { findClosestRadixColor } from "@/lib/colors";
import { $input, $matchedColor } from "@/store";
import { useStore } from "@nanostores/react";

$input.subscribe((value) => {
    $matchedColor.set(findClosestRadixColor(value));
});

const handlePaste = (event?: ClipboardEvent | FocusEvent) => {
  navigator.clipboard
  .readText()
    .then((text) => {
      if (text) {
        $input.set(text);
      }
    })
    .catch((err) => {
      console.error(err);

      if (!event) return;
      // Access clipboard data
      // @ts-expect-error window clipboardData is not typed
      const clipboardData = event?.clipboardData || window?.clipboardData;
      const pastedText = clipboardData.getData("text");
      if (pastedText) {
        $input.set(pastedText);
      }
    });
};

function handleVisibilityChange() {
  if (document.visibilityState === "visible") {
    handlePaste();
  }
}

document.addEventListener("paste", handlePaste);
document.addEventListener("visibilitychange", handleVisibilityChange);

function App() {
  const input = useStore($input);
  const matchedColor = useStore($matchedColor);

  return (
    <main className="app">
      <hgroup>
        <h1>Radix Color Matcher</h1>
        <p>Find the closest Radix color to your hex code</p>
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
            <p className="scale">{matchedColor.scale} scale <small>(step {matchedColor.step})</small></p>
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
  );
}

export default App;

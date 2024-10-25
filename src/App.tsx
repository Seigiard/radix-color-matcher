import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaintBucket, Palette } from 'lucide-react';
import { findClosestRadixColor } from '@/lib/colors';
import type { RadixColor } from '@/lib/radix-colors';

function App() {
  const [inputColor, setInputColor] = useState('#000000');
  const [matchedColor, setMatchedColor] = useState<RadixColor | null>(null);

  useEffect(() => {
    const handlePaste = (event) => {
      // Access clipboard data
      const clipboardData = event?.clipboardData || window?.clipboardData;
      const pastedText = clipboardData.getData('text');
      setInputColor(pastedText);
    };

    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  useEffect(() => {
    const closest = findClosestRadixColor(inputColor);
    console.log(inputColor, closest)
    setMatchedColor(closest);
  }, [inputColor])


  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 px-4 pt-16">
      <Card className="w-96 m-auto p-6 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">
            Radix Color Matcher
          </h1>
          <p className="text-muted-foreground">
            Find the closest Radix color to your hex code
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="color">Your Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  value={inputColor}
                  onChange={(e) => setInputColor(e.target.value)}
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={inputColor}
                  onChange={(e) => setInputColor(e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {matchedColor && (
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label>Closest Radix Color</Label>
                <div className="flex items-center gap-4 p-4 rounded-lg border">
                  <div
                    className="w-16 h-16 rounded-md shadow-sm"
                    style={{ backgroundColor: matchedColor.value }}
                  />
                  <div className="space-y-1">
                    <div className="font-medium">{matchedColor.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {matchedColor.value}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Palette className="h-3 w-3" />
                      <span>{matchedColor.scale} scale</span>
                      <span className="text-muted-foreground">
                        (step {matchedColor.step})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 h-24">
                <div
                  className="flex-1 rounded-lg"
                  style={{ backgroundColor: inputColor }}
                />
                <div
                  className="flex-1 rounded-lg"
                  style={{ backgroundColor: matchedColor.value }}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default App;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Palette } from "lucide-react";

const ColorPicker = () => {
  const [color, setColor] = useState("#6366f1");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Palette className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Color Picker & Converter</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Pick colors and convert between different formats
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="tool-card">
              <CardHeader>
                <CardTitle>Color Picker</CardTitle>
                <CardDescription>Choose a color using the picker or enter a hex value</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-16 rounded-lg border border-border cursor-pointer"
                  />
                  <div 
                    className="flex-1 h-16 rounded-lg border border-border"
                    style={{ backgroundColor: color }}
                  />
                </div>
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#6366f1"
                />
              </CardContent>
            </Card>

            <Card className="tool-card">
              <CardHeader>
                <CardTitle>Color Values</CardTitle>
                <CardDescription>Different format representations of your color</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium">HEX:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm">{color.toUpperCase()}</code>
                      <Button size="sm" onClick={() => copyToClipboard(color.toUpperCase())}>
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  {rgb && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">RGB:</span>
                      <div className="flex items-center gap-2">
                        <code className="text-sm">rgb({rgb.r}, {rgb.g}, {rgb.b})</code>
                        <Button size="sm" onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}>
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {hsl && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">HSL:</span>
                      <div className="flex items-center gap-2">
                        <code className="text-sm">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</code>
                        <Button size="sm" onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}>
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="tool-card mt-6">
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Quick access to common colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
                {[
                  "#FF0000", "#FF8000", "#FFFF00", "#80FF00", "#00FF00", "#00FF80",
                  "#00FFFF", "#0080FF", "#0000FF", "#8000FF", "#FF00FF", "#FF0080",
                  "#800000", "#804000", "#808000", "#408000", "#008000", "#008040",
                  "#008080", "#004080", "#000080", "#400080", "#800080", "#800040",
                ].map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => setColor(presetColor)}
                    className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: presetColor }}
                    title={presetColor}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
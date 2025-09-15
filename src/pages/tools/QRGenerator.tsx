import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Download } from "lucide-react";
import QRCodeStyling from "qr-code-styling";

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState("300");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dotType, setDotType] = useState("square");
  const [cornerType, setCornerType] = useState("square");
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  const generateQR = () => {
    if (!text.trim()) return;

    qrCode.current = new QRCodeStyling({
      width: parseInt(size),
      height: parseInt(size),
      type: "svg",
      data: text,
      dotsOptions: {
        color: color,
        type: dotType as any,
      },
      backgroundOptions: {
        color: bgColor,
      },
      cornersSquareOptions: {
        type: cornerType as any,
      },
      cornersDotOptions: {
        type: cornerType as any,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
      }
    });

    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = "";
      qrCode.current.append(qrCodeRef.current);
    }
  };

  const downloadQR = (format: "png" | "svg" | "jpeg") => {
    if (qrCode.current) {
      qrCode.current.download({
        name: "qr-code",
        extension: format
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <QrCode className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">QR Code Generator</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Create QR codes from any text, URL, or data with customizable styling
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="tool-card">
              <CardHeader>
                <CardTitle>QR Code Settings</CardTitle>
                <CardDescription>Customize your QR code appearance and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Text or URL</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text, URL, or any data..."
                    className="w-full h-24 p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="200">200x200</SelectItem>
                        <SelectItem value="300">300x300</SelectItem>
                        <SelectItem value="400">400x400</SelectItem>
                        <SelectItem value="500">500x500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dot Style</label>
                    <Select value={dotType} onValueChange={setDotType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="dots">Dots</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                        <SelectItem value="classy">Classy</SelectItem>
                        <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Foreground Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-12 h-10 rounded border border-border cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Background Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-12 h-10 rounded border border-border cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Corner Style</label>
                  <Select value={cornerType} onValueChange={setCornerType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dot">Dot</SelectItem>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generateQR} disabled={!text.trim()} className="btn-hero w-full">
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>

            <Card className="tool-card">
              <CardHeader>
                <CardTitle>Generated QR Code</CardTitle>
                <CardDescription>Your QR code will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div 
                    ref={qrCodeRef}
                    className="flex items-center justify-center min-h-[300px] w-full border-2 border-dashed border-border rounded-lg"
                  >
                    {!text.trim() && (
                      <p className="text-muted-foreground">Enter text and click generate</p>
                    )}
                  </div>

                  {text.trim() && qrCode.current && (
                    <div className="flex gap-2">
                      <Button onClick={() => downloadQR("png")} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        PNG
                      </Button>
                      <Button onClick={() => downloadQR("svg")} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        SVG
                      </Button>
                      <Button onClick={() => downloadQR("jpeg")} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        JPEG
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="tool-card mt-6">
            <CardHeader>
              <CardTitle>QR Code Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Website URLs</h4>
                  <p className="text-sm text-muted-foreground">
                    Share website links quickly and easily
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="text-sm text-muted-foreground">
                    Share phone numbers, emails, or vCard data
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">WiFi Passwords</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow easy WiFi connection sharing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
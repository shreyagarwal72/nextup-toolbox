import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link2, Copy, RotateCcw, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const URLEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode URL",
        variant: "destructive",
      });
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to decode URL - invalid encoding",
        variant: "destructive",
      });
    }
  };

  const handleProcess = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to process",
        variant: "destructive",
      });
      return;
    }

    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Link2 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">URL Encoder/Decoder</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Encode or decode URLs for web development and data processing
            </p>
          </div>

          <Card className="tool-card mb-6">
            <CardHeader>
              <CardTitle>URL Encoder/Decoder</CardTitle>
              <CardDescription>
                Convert URLs to percent-encoded format or decode them back to readable text
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={mode === "encode" ? "default" : "outline"}
                  onClick={() => setMode("encode")}
                  className="flex-1"
                >
                  Encode
                </Button>
                <Button
                  variant={mode === "decode" ? "default" : "outline"}
                  onClick={() => setMode("decode")}
                  className="flex-1"
                >
                  Decode
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {mode === "encode" ? "URL to Encode" : "URL to Decode"}
                </label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    mode === "encode" 
                      ? "Enter URL or text to encode (e.g., https://example.com/path with spaces)"
                      : "Enter encoded URL to decode (e.g., https%3A//example.com/path%20with%20spaces)"
                  }
                  className="w-full h-24"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleProcess}
                  disabled={!input.trim()}
                  className="btn-hero flex-1"
                >
                  {mode === "encode" ? "Encode URL" : "Decode URL"}
                </Button>
                <Button
                  onClick={clearAll}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {output && (
                <div>
                  <label className="block text-sm font-medium mb-2">Result</label>
                  <div className="relative">
                    <Textarea
                      value={output}
                      readOnly
                      className="w-full h-24 bg-muted"
                    />
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      className="absolute top-2 right-2"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Encoding:</strong> Converts special characters to percent-encoded format safe for URLs.
                  <br />
                  <strong>Decoding:</strong> Converts percent-encoded strings back to readable text.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="tool-card">
            <CardHeader>
              <CardTitle>Common Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Encoding</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• URLs with spaces or special characters</li>
                    <li>• Query parameters with special symbols</li>
                    <li>• API endpoints with complex paths</li>
                    <li>• Form data transmission</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Decoding</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Reading encoded URLs from logs</li>
                    <li>• Debugging web requests</li>
                    <li>• Processing form submissions</li>
                    <li>• Analyzing traffic data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default URLEncoder;
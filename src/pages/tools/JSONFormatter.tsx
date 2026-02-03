import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Code, Copy, Check, Minimize2, Maximize2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message);
      setOutput("");
    }
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard",
      });
    }
  };

  const sampleJSON = () => {
    setInput(JSON.stringify({
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
      },
      hobbies: ["reading", "gaming", "coding"]
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">JSON Formatter</h1>
            <p className="text-muted-foreground">
              Format, beautify, and minify your JSON data
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Input JSON</CardTitle>
                  <Button onClick={sampleJSON} variant="ghost" size="sm">
                    Load Sample
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='{"key": "value"}'
                  className="min-h-[300px] font-mono text-sm bg-muted/30"
                />
                <div className="flex gap-2 mt-4">
                  <Button onClick={formatJSON} className="btn-hero flex-1">
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Format
                  </Button>
                  <Button onClick={minifyJSON} variant="outline" className="btn-glass flex-1">
                    <Minimize2 className="w-4 h-4 mr-2" />
                    Minify
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Output</CardTitle>
                  {output && (
                    <Button onClick={copyOutput} variant="ghost" size="sm">
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm">
                    {error}
                  </div>
                ) : (
                  <Textarea
                    value={output}
                    readOnly
                    placeholder="Formatted JSON will appear here..."
                    className="min-h-[300px] font-mono text-sm bg-muted/30"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;

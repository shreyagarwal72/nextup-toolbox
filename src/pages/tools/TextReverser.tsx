import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RotateCcw, Copy, Type, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextReverser = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [reverseMode, setReverseMode] = useState<"characters" | "words">("characters");
  const { toast } = useToast();

  const handleReverse = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to reverse",
        variant: "destructive",
      });
      return;
    }

    let reversed = "";
    if (reverseMode === "characters") {
      reversed = input.split("").reverse().join("");
    } else {
      reversed = input.split(" ").reverse().join(" ");
    }
    
    setOutput(reversed);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Reversed text copied to clipboard",
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
              <RotateCcw className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Text Reverser</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Reverse text character by character or word by word instantly
            </p>
          </div>

          <Card className="tool-card mb-6">
            <CardHeader>
              <CardTitle>Reverse Text</CardTitle>
              <CardDescription>
                Choose to reverse by characters or by words and get instant results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={reverseMode === "characters" ? "default" : "outline"}
                  onClick={() => setReverseMode("characters")}
                  className="flex-1"
                >
                  <Type className="w-4 h-4 mr-2" />
                  By Characters
                </Button>
                <Button
                  variant={reverseMode === "words" ? "default" : "outline"}
                  onClick={() => setReverseMode("words")}
                  className="flex-1"
                >
                  By Words
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Text to Reverse</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter the text you want to reverse..."
                  className="w-full h-32"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleReverse}
                  disabled={!input.trim()}
                  className="btn-hero flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reverse Text
                </Button>
                <Button
                  onClick={clearAll}
                  variant="outline"
                >
                  Clear
                </Button>
              </div>

              {output && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Reversed Text</label>
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      variant="outline"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={output}
                    readOnly
                    className="w-full h-32 bg-muted"
                  />
                </div>
              )}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Character reversal:</strong> Reverses each character (Hello → olleH)
                  <br />
                  <strong>Word reversal:</strong> Reverses word order (Hello World → World Hello)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="tool-card">
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Character Reversal</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Creating mirror text effects</li>
                    <li>• Simple text obfuscation</li>
                    <li>• Fun text transformations</li>
                    <li>• Palindrome testing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Word Reversal</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Changing sentence structure</li>
                    <li>• Creative writing exercises</li>
                    <li>• Language learning activities</li>
                    <li>• Text manipulation for design</li>
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

export default TextReverser;
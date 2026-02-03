import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Hash, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Simple hash functions (for demonstration - in production, use crypto library)
  const simpleHash = (str: string, seed: number = 0): string => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
  };

  const cyrb53 = (str: string): string => {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 0x85ebca77);
      h2 = Math.imul(h2 ^ ch, 0xc2b2ae3d);
    }
    h1 ^= Math.imul(h1 ^ (h2 >>> 15), 0x735a2d97);
    h2 ^= Math.imul(h2 ^ (h1 >>> 15), 0xcaf649a9);
    h1 ^= h2 >>> 16; h2 ^= h1 >>> 16;
    return (2097152 * (h2 >>> 0) + (h1 >>> 11)).toString(16).padStart(13, '0');
  };

  const djb2 = (str: string): string => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash = hash >>> 0; // Convert to unsigned
    }
    return hash.toString(16).padStart(8, '0');
  };

  const generateHashes = () => {
    if (!input.trim()) {
      toast({ title: "Error", description: "Please enter some text", variant: "destructive" });
      return;
    }

    setHashes({
      "DJB2": djb2(input),
      "CYRB53": cyrb53(input),
      "MurmurHash3-like": simpleHash(input, 0),
      "Custom Hash 1": simpleHash(input, 42),
      "Custom Hash 2": simpleHash(input, 137),
    });
  };

  const copyHash = (name: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedHash(name);
    setTimeout(() => setCopiedHash(null), 2000);
    toast({ title: "Copied!", description: `${name} hash copied to clipboard` });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <Hash className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Hash Generator</h1>
            <p className="text-muted-foreground">
              Generate hash values from text using various algorithms
            </p>
          </div>

          <Card className="glass-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-lg">Input Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to hash..."
                className="min-h-[120px] bg-muted/30"
              />
              <Button onClick={generateHashes} className="btn-hero w-full">
                <Hash className="w-4 h-4 mr-2" />
                Generate Hashes
              </Button>
            </CardContent>
          </Card>

          {Object.keys(hashes).length > 0 && (
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Generated Hashes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(hashes).map(([name, value]) => (
                    <div 
                      key={name}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl group hover:bg-muted transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">{name}</p>
                        <code className="text-sm font-mono text-foreground break-all">{value}</code>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyHash(name, value)}
                        className="ml-4 flex-shrink-0"
                      >
                        {copiedHash === name ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="glass-card mt-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground text-center">
                Note: These are non-cryptographic hash functions suitable for checksums and data integrity. 
                For security purposes, use proper cryptographic hash functions like SHA-256.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HashGenerator;

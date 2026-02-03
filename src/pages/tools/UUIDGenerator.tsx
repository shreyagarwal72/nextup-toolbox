import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Fingerprint, Copy, RefreshCw, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const UUIDGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUUIDs = () => {
    const newUUIDs = [];
    for (let i = 0; i < count; i++) {
      newUUIDs.push(generateUUID());
    }
    setUuids(newUUIDs);
  };

  const copyToClipboard = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast({
      title: "Copied!",
      description: "UUID copied to clipboard",
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    toast({
      title: "Copied All!",
      description: `${uuids.length} UUIDs copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <Fingerprint className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">UUID Generator</h1>
            <p className="text-muted-foreground">
              Generate unique Universal Unique Identifiers (UUID v4)
            </p>
          </div>

          <Card className="glass-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-lg">Generator Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-foreground whitespace-nowrap">
                  Count:
                </label>
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                  min={1}
                  max={50}
                  className="w-24"
                />
                <Button onClick={generateUUIDs} className="btn-hero flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate UUIDs
                </Button>
              </div>
            </CardContent>
          </Card>

          {uuids.length > 0 && (
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Generated UUIDs</CardTitle>
                <Button onClick={copyAll} variant="outline" size="sm" className="btn-glass">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {uuids.map((uuid, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-xl group hover:bg-muted transition-colors"
                    >
                      <code className="text-sm font-mono text-foreground">{uuid}</code>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(uuid, index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedIndex === index ? (
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
        </div>
      </div>
    </div>
  );
};

export default UUIDGenerator;

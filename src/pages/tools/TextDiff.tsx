import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Diff, ArrowLeftRight, Plus, Minus } from "lucide-react";
import Header from "@/components/Header";

const TextDiff = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<{ type: string; value: string }[]>([]);

  const computeDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: { type: string; value: string }[] = [];
    
    const maxLen = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 === line2) {
        if (line1) result.push({ type: 'same', value: line1 });
      } else {
        if (line1) result.push({ type: 'removed', value: line1 });
        if (line2) result.push({ type: 'added', value: line2 });
      }
    }
    
    setDiff(result);
  };

  const swapTexts = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const loadSample = () => {
    setText1(`function hello() {
  console.log("Hello World");
  return true;
}`);
    setText2(`function hello() {
  console.log("Hello Universe");
  return false;
}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <Diff className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Text Diff Checker</h1>
            <p className="text-muted-foreground">
              Compare two texts and see the differences highlighted
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Original Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  placeholder="Enter original text..."
                  className="min-h-[200px] font-mono text-sm bg-muted/30"
                />
              </CardContent>
            </Card>

            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Modified Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder="Enter modified text..."
                  className="min-h-[200px] font-mono text-sm bg-muted/30"
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button onClick={loadSample} variant="outline" className="btn-glass">
              Load Sample
            </Button>
            <Button onClick={swapTexts} variant="outline" className="btn-glass">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Swap
            </Button>
            <Button onClick={computeDiff} className="btn-hero">
              <Diff className="w-4 h-4 mr-2" />
              Compare Texts
            </Button>
          </div>

          {diff.length > 0 && (
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Differences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-sm space-y-1 p-4 bg-muted/30 rounded-xl overflow-x-auto">
                  {diff.map((line, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-2 px-2 py-1 rounded ${
                        line.type === 'added' 
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                          : line.type === 'removed'
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <span className="flex-shrink-0 w-5">
                        {line.type === 'added' && <Plus className="w-4 h-4" />}
                        {line.type === 'removed' && <Minus className="w-4 h-4" />}
                      </span>
                      <span className="whitespace-pre-wrap break-all">{line.value || ' '}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500/20 rounded" />
                    <span className="text-xs text-muted-foreground">Added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500/20 rounded" />
                    <span className="text-xs text-muted-foreground">Removed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-muted rounded" />
                    <span className="text-xs text-muted-foreground">Unchanged</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextDiff;

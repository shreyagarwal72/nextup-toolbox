import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ListOrdered, Copy, Shuffle, SortAsc, SortDesc, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const ListSorter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [trimItems, setTrimItems] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);

  const processItems = () => {
    let items = input.split('\n');
    
    if (trimItems) {
      items = items.map(item => item.trim());
    }
    
    if (removeEmpty) {
      items = items.filter(item => item.length > 0);
    }
    
    if (removeDuplicates) {
      items = [...new Set(items)];
    }
    
    return items;
  };

  const sortAZ = () => {
    const items = processItems();
    items.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    setOutput(items.join('\n'));
  };

  const sortZA = () => {
    const items = processItems();
    items.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));
    setOutput(items.join('\n'));
  };

  const shuffleList = () => {
    const items = processItems();
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    setOutput(items.join('\n'));
  };

  const reverseList = () => {
    const items = processItems();
    setOutput(items.reverse().join('\n'));
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "List copied to clipboard" });
    }
  };

  const loadSample = () => {
    setInput("Banana\nApple\nCherry\nApple\nDate\nElderberry\nBanana\nFig");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <ListOrdered className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">List Sorter</h1>
            <p className="text-muted-foreground">
              Sort, shuffle, and organize lists easily
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Input List</CardTitle>
                  <Button onClick={loadSample} variant="ghost" size="sm">
                    Load Sample
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter items, one per line..."
                  className="min-h-[200px] bg-muted/30"
                />
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="removeDuplicates"
                      checked={removeDuplicates} 
                      onCheckedChange={(checked) => setRemoveDuplicates(checked as boolean)} 
                    />
                    <label htmlFor="removeDuplicates" className="text-sm text-foreground">Remove duplicates</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="trimItems"
                      checked={trimItems} 
                      onCheckedChange={(checked) => setTrimItems(checked as boolean)} 
                    />
                    <label htmlFor="trimItems" className="text-sm text-foreground">Trim whitespace</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="removeEmpty"
                      checked={removeEmpty} 
                      onCheckedChange={(checked) => setRemoveEmpty(checked as boolean)} 
                    />
                    <label htmlFor="removeEmpty" className="text-sm text-foreground">Remove empty lines</label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={sortAZ} className="btn-hero">
                    <SortAsc className="w-4 h-4 mr-2" />
                    Sort A-Z
                  </Button>
                  <Button onClick={sortZA} variant="outline" className="btn-glass">
                    <SortDesc className="w-4 h-4 mr-2" />
                    Sort Z-A
                  </Button>
                  <Button onClick={shuffleList} variant="outline" className="btn-glass">
                    <Shuffle className="w-4 h-4 mr-2" />
                    Shuffle
                  </Button>
                  <Button onClick={reverseList} variant="outline" className="btn-glass">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Reverse
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
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Sorted list will appear here..."
                  className="min-h-[300px] bg-muted/30"
                />
                {output && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {output.split('\n').filter(l => l.length > 0).length} items
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSorter;

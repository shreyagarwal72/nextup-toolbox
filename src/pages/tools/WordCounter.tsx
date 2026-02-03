import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const WordCounter = () => {
  const { toast } = useToast();
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    return { words, characters, charactersNoSpaces, paragraphs, sentences, readingTime };
  }, [text]);

  const copyStats = async () => {
    const statsText = `Words: ${stats.words} | Characters: ${stats.characters} | Reading time: ${stats.readingTime} min`;
    try {
      await navigator.clipboard.writeText(statsText);
      toast({ title: "Copied!", description: "Statistics copied to clipboard" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to copy", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Word Counter</h1>
            <p className="text-muted-foreground">
              Count words, characters, paragraphs, and get reading time estimates
            </p>
          </div>

          <Card className="glass-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6 space-y-4">
              <Textarea
                placeholder="Paste or type your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px] resize-none bg-muted/30"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setText("")} disabled={!text} className="btn-glass">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button variant="outline" onClick={copyStats} disabled={!text} className="btn-glass">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Stats
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Words", value: stats.words, color: "text-primary" },
              { label: "Characters", value: stats.characters, color: "text-accent" },
              { label: "No Spaces", value: stats.charactersNoSpaces, color: "text-purple-500" },
              { label: "Paragraphs", value: stats.paragraphs, color: "text-green-500" },
              { label: "Sentences", value: stats.sentences, color: "text-yellow-500" },
              { label: `Min${stats.readingTime === 1 ? '' : 's'} Read`, value: stats.readingTime, color: "text-muted-foreground" },
            ].map((stat, index) => (
              <Card 
                key={stat.label} 
                className="glass-card animate-fade-in" 
                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              >
                <CardContent className="pt-6 text-center">
                  <div className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;

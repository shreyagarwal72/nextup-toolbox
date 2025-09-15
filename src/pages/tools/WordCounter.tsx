import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const WordCounter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200)); // Average reading speed: 200 words/minute

    return {
      words,
      characters,
      charactersNoSpaces,
      paragraphs,
      sentences,
      readingTime,
    };
  }, [text]);

  const copyStats = async () => {
    const statsText = `Text Statistics:
Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Paragraphs: ${stats.paragraphs}
Sentences: ${stats.sentences}
Reading time: ${stats.readingTime} minute${stats.readingTime === 1 ? '' : 's'}`;

    try {
      await navigator.clipboard.writeText(statsText);
      toast({
        title: "Copied!",
        description: "Statistics copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy statistics",
        variant: "destructive",
      });
    }
  };

  const clearText = () => {
    setText("");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Button>

        <Card className="tool-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Word Counter</CardTitle>
            <CardDescription>
              Count words, characters, paragraphs, and get reading time estimates
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Textarea
                placeholder="Paste or type your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={clearText} disabled={!text}>
                  Clear Text
                </Button>
                <Button variant="outline" onClick={copyStats} disabled={!text}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Stats
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.words.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Words</div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/50 border-secondary">
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-secondary-foreground">
                    {stats.characters.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Characters</div>
                </CardContent>
              </Card>

              <Card className="bg-accent/50 border-accent">
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-accent-foreground">
                    {stats.charactersNoSpaces.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">No Spaces</div>
                </CardContent>
              </Card>

              <Card className="bg-success/10 border-success/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-success">
                    {stats.paragraphs.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Paragraphs</div>
                </CardContent>
              </Card>

              <Card className="bg-warning/10 border-warning/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-warning">
                    {stats.sentences.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Sentences</div>
                </CardContent>
              </Card>

              <Card className="bg-muted border-border">
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-muted-foreground">
                    {stats.readingTime}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Min{stats.readingTime === 1 ? '' : 's'} Read
                  </div>
                </CardContent>
              </Card>
            </div>

            {text && (
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>📖 Average reading time is based on 200 words per minute</p>
                    <p>📝 Word count excludes extra whitespace</p>
                    <p>📄 Paragraphs are separated by blank lines</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WordCounter;
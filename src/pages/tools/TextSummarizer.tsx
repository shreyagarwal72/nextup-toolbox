import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileSearch, AlertCircle, ExternalLink } from "lucide-react";
import Header from "@/components/Header";

const TextSummarizer = () => {
  const [text, setText] = useState("");

  const handleExternalSummarizer = () => {
    window.open('https://www.summarizing.biz/', '_blank');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <FileSearch className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Text Summarizer</h1>
            <p className="text-muted-foreground">
              Summarize long text into short key points using professional tools
            </p>
          </div>

          <Card className="glass-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-lg">Access Professional Text Summarizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Preview your text (optional)</label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here to preview before summarizing..."
                  className="w-full h-32 bg-muted/30"
                />
              </div>

              <Button 
                onClick={handleExternalSummarizer}
                className="btn-hero w-full"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Professional Summarizer Tool
              </Button>

              <Alert className="bg-muted/50 border-border">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-muted-foreground">
                  This will open a professional text summarization service in a new tab for the best results.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Copy Your Text", desc: "Copy the long text or document you want to summarize" },
                  { step: 2, title: "Open Summarizer Tool", desc: "Click the button above to open the professional summarization service" },
                  { step: 3, title: "Get Summary", desc: "Paste your text and get a concise summary with key points" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextSummarizer;

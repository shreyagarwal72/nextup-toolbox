import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileSearch, AlertCircle, ExternalLink } from "lucide-react";

const TextSummarizer = () => {
  const [text, setText] = useState("");

  const handleExternalSummarizer = () => {
    window.open('https://www.summarizing.biz/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileSearch className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Text Summarizer</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Summarize long text into short key points using professional tools
            </p>
          </div>

          <Card className="tool-card mb-6">
            <CardHeader>
              <CardTitle>Access Professional Text Summarizer</CardTitle>
              <CardDescription>
                Use our recommended external summarization tool for best results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Preview your text (optional)</label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here to preview before summarizing..."
                  className="w-full h-32"
                />
              </div>

              <Button 
                onClick={handleExternalSummarizer}
                className="btn-hero w-full"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open Professional Summarizer Tool
                </div>
              </Button>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This will open a professional text summarization service in a new tab for the best results.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="tool-card">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Copy Your Text</h3>
                    <p className="text-sm text-muted-foreground">
                      Copy the long text or document you want to summarize
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Open Summarizer Tool</h3>
                    <p className="text-sm text-muted-foreground">
                      Click the button above to open the professional summarization service
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Get Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      Paste your text and get a concise summary with key points
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextSummarizer;
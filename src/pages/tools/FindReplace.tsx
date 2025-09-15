import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const FindReplace = () => {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWords, setWholeWords] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  const highlightMatches = (text: string, find: string) => {
    if (!find || !text) return text;
    
    try {
      let flags = 'g';
      if (!caseSensitive) flags += 'i';
      
      let pattern = find;
      if (!useRegex) {
        pattern = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      if (wholeWords) {
        pattern = `\\b${pattern}\\b`;
      }
      
      const regex = new RegExp(pattern, flags);
      return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$&</mark>');
    } catch (e) {
      return text;
    }
  };

  const performReplace = () => {
    if (!findText || !text) return;
    
    try {
      let flags = 'g';
      if (!caseSensitive) flags += 'i';
      
      let pattern = findText;
      if (!useRegex) {
        pattern = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      if (wholeWords) {
        pattern = `\\b${pattern}\\b`;
      }
      
      const regex = new RegExp(pattern, flags);
      const newText = text.replace(regex, replaceText);
      setText(newText);
    } catch (e) {
      console.error('Invalid regex pattern');
    }
  };

  const getMatchCount = () => {
    if (!findText || !text) return 0;
    
    try {
      let flags = 'g';
      if (!caseSensitive) flags += 'i';
      
      let pattern = findText;
      if (!useRegex) {
        pattern = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      if (wholeWords) {
        pattern = `\\b${pattern}\\b`;
      }
      
      const regex = new RegExp(pattern, flags);
      const matches = text.match(regex);
      return matches ? matches.length : 0;
    } catch (e) {
      return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Find & Replace</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Find words in text and replace them instantly with advanced options
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="tool-card">
                <CardHeader>
                  <CardTitle>Search & Replace</CardTitle>
                  <CardDescription>Configure your find and replace operation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Find Text</label>
                    <Input
                      type="text"
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                      placeholder="Enter text to find..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Replace With</label>
                    <Input
                      type="text"
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                      placeholder="Enter replacement text..."
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="caseSensitive"
                        checked={caseSensitive}
                        onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                      />
                      <label htmlFor="caseSensitive" className="text-sm">Case sensitive</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wholeWords"
                        checked={wholeWords}
                        onCheckedChange={(checked) => setWholeWords(checked as boolean)}
                      />
                      <label htmlFor="wholeWords" className="text-sm">Whole words only</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="useRegex"
                        checked={useRegex}
                        onCheckedChange={(checked) => setUseRegex(checked as boolean)}
                      />
                      <label htmlFor="useRegex" className="text-sm">Use regular expressions</label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={performReplace} className="btn-hero flex-1">
                      Replace All
                    </Button>
                    <div className="flex items-center px-3 py-2 bg-muted rounded-lg">
                      <span className="text-sm text-muted-foreground">
                        {getMatchCount()} matches
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="tool-card">
                <CardHeader>
                  <CardTitle>Text Editor</CardTitle>
                  <CardDescription>Enter or paste your text here</CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="w-full h-96 p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {findText && (
            <Card className="tool-card mt-6">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Text with matches highlighted</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="w-full min-h-[200px] p-3 border border-border rounded-lg bg-muted whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: highlightMatches(text, findText) }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindReplace;
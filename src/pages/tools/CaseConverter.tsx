import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Type, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const CaseConverter = () => {
  const [text, setText] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const convertCase = (type: string) => {
    switch (type) {
      case "upper": return text.toUpperCase();
      case "lower": return text.toLowerCase();
      case "title": return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
      case "camel": return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      ).replace(/\s+/g, '');
      case "pascal": return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
        word.toUpperCase()
      ).replace(/\s+/g, '');
      case "snake": return text.toLowerCase().replace(/\s+/g, '_');
      case "kebab": return text.toLowerCase().replace(/\s+/g, '-');
      case "sentence": return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      default: return text;
    }
  };

  const copyToClipboard = (key: string, convertedText: string) => {
    navigator.clipboard.writeText(convertedText);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
    toast({ title: "Copied!", description: "Text copied to clipboard" });
  };

  const caseTypes = [
    { key: "upper", label: "UPPERCASE", desc: "ALL LETTERS CAPITALIZED" },
    { key: "lower", label: "lowercase", desc: "all letters small" },
    { key: "title", label: "Title Case", desc: "First Letter Of Each Word" },
    { key: "sentence", label: "Sentence case", desc: "First letter capitalized" },
    { key: "camel", label: "camelCase", desc: "firstWordLowerRestCapital" },
    { key: "pascal", label: "PascalCase", desc: "FirstLetterOfEachWordCapital" },
    { key: "snake", label: "snake_case", desc: "words_separated_by_underscores" },
    { key: "kebab", label: "kebab-case", desc: "words-separated-by-hyphens" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <Type className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Case Converter</h1>
            <p className="text-muted-foreground">
              Convert text to different case formats instantly
            </p>
          </div>

          <Card className="glass-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-lg">Enter Your Text</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-32 p-4 border border-border rounded-xl bg-muted/30 text-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseTypes.map((caseType, index) => (
              <Card 
                key={caseType.key} 
                className="glass-card group animate-fade-in" 
                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">{caseType.label}</CardTitle>
                  <p className="text-xs text-muted-foreground">{caseType.desc}</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-3 rounded-xl mb-3 min-h-[60px] break-all">
                    <span className="text-sm text-foreground">
                      {text ? convertCase(caseType.key) : "Your converted text will appear here"}
                    </span>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(caseType.key, convertCase(caseType.key))}
                    disabled={!text}
                    className="w-full btn-hero"
                    size="sm"
                  >
                    {copiedKey === caseType.key ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Text
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;

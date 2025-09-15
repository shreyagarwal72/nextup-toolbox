import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Type } from "lucide-react";

const CaseConverter = () => {
  const [text, setText] = useState("");

  const convertCase = (type: string) => {
    switch (type) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "title":
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case "camel":
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, '');
      case "pascal":
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
          word.toUpperCase()
        ).replace(/\s+/g, '');
      case "snake":
        return text.toLowerCase().replace(/\s+/g, '_');
      case "kebab":
        return text.toLowerCase().replace(/\s+/g, '-');
      case "sentence":
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      default:
        return text;
    }
  };

  const copyToClipboard = (convertedText: string) => {
    navigator.clipboard.writeText(convertedText);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Type className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Case Converter</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Convert text to different case formats instantly
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Enter Your Text</CardTitle>
              <CardDescription>
                Type or paste your text below to convert it to different cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-32 p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "upper", label: "UPPERCASE", desc: "ALL LETTERS CAPITALIZED" },
              { key: "lower", label: "lowercase", desc: "all letters small" },
              { key: "title", label: "Title Case", desc: "First Letter Of Each Word" },
              { key: "sentence", label: "Sentence case", desc: "First letter capitalized" },
              { key: "camel", label: "camelCase", desc: "firstWordLowerRestCapital" },
              { key: "pascal", label: "PascalCase", desc: "FirstLetterOfEachWordCapital" },
              { key: "snake", label: "snake_case", desc: "words_separated_by_underscores" },
              { key: "kebab", label: "kebab-case", desc: "words-separated-by-hyphens" },
            ].map((caseType) => (
              <Card key={caseType.key} className="tool-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{caseType.label}</CardTitle>
                  <CardDescription className="text-sm">{caseType.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-lg mb-3 min-h-[60px] break-all">
                    <span className="text-muted-foreground">
                      {text ? convertCase(caseType.key) : "Your converted text will appear here"}
                    </span>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(convertCase(caseType.key))}
                    disabled={!text}
                    className="w-full btn-hero"
                    size="sm"
                  >
                    Copy Text
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FileText } from "lucide-react";

const LoremGenerator = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState("");

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
    "accusamus", "accusantium", "doloremque", "laudantium", "totam", "rem",
    "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis",
    "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt", "explicabo"
  ];

  const generateLorem = () => {
    const result = [];
    
    for (let i = 0; i < paragraphs; i++) {
      let paragraph = [];
      
      if (i === 0 && startWithLorem) {
        paragraph.push("Lorem", "ipsum", "dolor", "sit", "amet");
      }
      
      while (paragraph.length < wordsPerParagraph) {
        const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
        paragraph.push(randomWord);
      }
      
      // Capitalize first letter and add period at the end
      if (paragraph.length > 0) {
        paragraph[0] = paragraph[0].charAt(0).toUpperCase() + paragraph[0].slice(1);
        const lastIndex = paragraph.length - 1;
        paragraph[lastIndex] = paragraph[lastIndex] + ".";
      }
      
      result.push(paragraph.join(" "));
    }
    
    setGeneratedText(result.join("\n\n"));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "lorem-ipsum.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Lorem Ipsum Generator</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Generate dummy text for your designs and layouts instantly
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="tool-card">
              <CardHeader>
                <CardTitle>Generator Settings</CardTitle>
                <CardDescription>Customize your Lorem Ipsum text generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Paragraphs: {paragraphs}
                  </label>
                  <Slider
                    value={[paragraphs]}
                    onValueChange={(value) => setParagraphs(value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Words per Paragraph: {wordsPerParagraph}
                  </label>
                  <Slider
                    value={[wordsPerParagraph]}
                    onValueChange={(value) => setWordsPerParagraph(value[0])}
                    max={200}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="startWithLorem"
                    checked={startWithLorem}
                    onChange={(e) => setStartWithLorem(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="startWithLorem" className="text-sm">
                    Start with "Lorem ipsum dolor sit amet"
                  </label>
                </div>

                <Button onClick={generateLorem} className="btn-hero w-full">
                  Generate Lorem Ipsum
                </Button>

                {generatedText && (
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                      Copy Text
                    </Button>
                    <Button onClick={downloadText} variant="outline" className="flex-1">
                      Download
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="tool-card">
              <CardHeader>
                <CardTitle>Generated Text</CardTitle>
                <CardDescription>Your Lorem Ipsum text will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                  placeholder="Click 'Generate Lorem Ipsum' to create dummy text..."
                  className="w-full h-96 p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  readOnly
                />
              </CardContent>
            </Card>
          </div>

          <Card className="tool-card mt-6">
            <CardHeader>
              <CardTitle>About Lorem Ipsum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type 
                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the 
                leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s 
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoremGenerator;
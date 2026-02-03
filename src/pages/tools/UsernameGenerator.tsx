import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const UsernameGenerator = () => {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const adjectives = ["Cool", "Swift", "Bright", "Bold", "Quick", "Smart", "Epic", "Wild", "Fast", "Dark", "Cyber", "Neon", "Pixel", "Ultra", "Mega"];
  const nouns = ["Tiger", "Wolf", "Eagle", "Dragon", "Phoenix", "Shadow", "Storm", "Flame", "Ninja", "Knight", "Wizard", "Ghost", "Raven", "Viper", "Hawk"];
  const numbers = "0123456789";
  const symbols = "_-";

  const generateUsernames = () => {
    const generated = [];
    for (let i = 0; i < 10; i++) {
      let username = "";
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      username = adj + noun;
      
      if (includeNumbers) {
        const numCount = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numCount; j++) {
          username += numbers[Math.floor(Math.random() * numbers.length)];
        }
      }
      
      if (includeSymbols && Math.random() > 0.5) {
        username += symbols[Math.floor(Math.random() * symbols.length)];
      }
      
      if (username.length > length) {
        username = username.substring(0, length);
      }
      
      generated.push(username);
    }
    setUsernames(generated);
  };

  const copyUsername = (username: string, index: number) => {
    navigator.clipboard.writeText(username);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast({ title: "Copied!", description: "Username copied to clipboard" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Username Generator</h1>
            <p className="text-muted-foreground">
              Generate unique usernames quickly for social media and accounts
            </p>
          </div>

          <Card className="glass-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-lg">Generator Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Max Length: {length}
                </label>
                <Slider 
                  value={[length]} 
                  onValueChange={(value) => setLength(value[0])} 
                  max={20} 
                  min={4} 
                />
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeNumbers"
                    checked={includeNumbers} 
                    onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)} 
                  />
                  <label htmlFor="includeNumbers" className="text-sm text-foreground">Include Numbers</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeSymbols"
                    checked={includeSymbols} 
                    onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)} 
                  />
                  <label htmlFor="includeSymbols" className="text-sm text-foreground">Include Symbols</label>
                </div>
              </div>
              
              <Button onClick={generateUsernames} className="btn-hero w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Usernames
              </Button>
            </CardContent>
          </Card>

          {usernames.length > 0 && (
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Generated Usernames</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {usernames.map((username, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-xl group hover:bg-muted transition-colors"
                    >
                      <code className="font-mono text-foreground">{username}</code>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyUsername(username, index)}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsernameGenerator;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "lucide-react";

const UsernameGenerator = () => {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([]);

  const adjectives = ["Cool", "Swift", "Bright", "Bold", "Quick", "Smart", "Epic", "Wild", "Fast", "Dark"];
  const nouns = ["Tiger", "Wolf", "Eagle", "Dragon", "Phoenix", "Shadow", "Storm", "Flame", "Ninja", "Knight"];
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

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <User className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Username Generator</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Generate unique usernames quickly for social media and accounts
            </p>
          </div>

          <Card className="tool-card mb-6">
            <CardHeader>
              <CardTitle>Generator Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Length: {length}</label>
                <Slider value={[length]} onValueChange={(value) => setLength(value[0])} max={20} min={4} />
              </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      checked={includeNumbers} 
                      onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)} 
                    />
                    <label>Include Numbers</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      checked={includeSymbols} 
                      onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)} 
                    />
                    <label>Include Symbols</label>
                  </div>
              <Button onClick={generateUsernames} className="btn-hero w-full">Generate Usernames</Button>
            </CardContent>
          </Card>

          {usernames.length > 0 && (
            <Card className="tool-card">
              <CardHeader>
                <CardTitle>Generated Usernames</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {usernames.map((username, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span>{username}</span>
                      <Button size="sm" onClick={() => navigator.clipboard.writeText(username)}>Copy</Button>
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
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Shield, Copy, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PasswordGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const generatePassword = () => {
    const chars = {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    };

    let availableChars = "";
    Object.entries(options).forEach(([key, enabled]) => {
      if (enabled) {
        availableChars += chars[key as keyof typeof chars];
      }
    });

    if (!availableChars) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }
    setPassword(result);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length < 8) return { level: "Weak", color: "text-destructive" };
    if (pwd.length < 12) return { level: "Medium", color: "text-warning" };
    return { level: "Strong", color: "text-success" };
  };

  const strength = password ? getPasswordStrength(password) : null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
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
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Password Generator</CardTitle>
            <CardDescription>
              Generate secure passwords with customizable options
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Password Length: {length[0]}</Label>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  max={64}
                  min={4}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, uppercase: checked as boolean })
                    }
                  />
                  <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, lowercase: checked as boolean })
                    }
                  />
                  <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, numbers: checked as boolean })
                    }
                  />
                  <Label htmlFor="numbers">Numbers (0-9)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, symbols: checked as boolean })
                    }
                  />
                  <Label htmlFor="symbols">Symbols (!@#$)</Label>
                </div>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full btn-hero">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Password
            </Button>

            {password && (
              <Card className="bg-accent/50 border-accent">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Generated Password</Label>
                      {strength && (
                        <span className={`text-sm font-medium ${strength.color}`}>
                          {strength.level}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={password}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyToClipboard}
                        className="shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
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

export default PasswordGenerator;
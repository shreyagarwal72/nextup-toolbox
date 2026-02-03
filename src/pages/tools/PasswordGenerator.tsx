import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Shield, Copy, RefreshCw, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
    if (pwd.length < 8) return { level: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (pwd.length < 12) return { level: "Medium", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { level: "Strong", color: "text-green-500", bg: "bg-green-500" };
  };

  const strength = password ? getPasswordStrength(password) : null;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Password Generator</h1>
            <p className="text-muted-foreground">
              Generate secure passwords with customizable options
            </p>
          </div>

          <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Password Length: {length[0]}</Label>
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
                    <Label htmlFor="uppercase" className="text-foreground">Uppercase (A-Z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={options.lowercase}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, lowercase: checked as boolean })
                      }
                    />
                    <Label htmlFor="lowercase" className="text-foreground">Lowercase (a-z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={options.numbers}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, numbers: checked as boolean })
                      }
                    />
                    <Label htmlFor="numbers" className="text-foreground">Numbers (0-9)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={options.symbols}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, symbols: checked as boolean })
                      }
                    />
                    <Label htmlFor="symbols" className="text-foreground">Symbols (!@#$)</Label>
                  </div>
                </div>
              </div>

              <Button onClick={generatePassword} className="w-full btn-hero">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Password
              </Button>

              {password && (
                <div className="p-4 bg-muted/50 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">Generated Password</Label>
                    {strength && (
                      <span className={`text-sm font-medium ${strength.color}`}>
                        {strength.level}
                      </span>
                    )}
                  </div>
                  {strength && (
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${strength.bg} transition-all duration-500`}
                        style={{ width: password.length < 8 ? '33%' : password.length < 12 ? '66%' : '100%' }}
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      value={password}
                      readOnly
                      className="font-mono text-sm bg-background"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyToClipboard}
                      className="shrink-0 btn-glass"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgeCalculator = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays });
  };

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
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Age Calculator</CardTitle>
            <CardDescription>
              Calculate your exact age in years, months, and days
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="birthdate">Birth Date</Label>
              <Input
                id="birthdate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <Button 
              onClick={calculateAge} 
              className="w-full btn-hero"
              disabled={!birthDate}
            >
              Calculate Age
            </Button>

            {result && (
              <Card className="bg-accent/50 border-accent">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold text-accent-foreground">
                      Your Age
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {result.years}
                        </div>
                        <div className="text-sm text-muted-foreground">Years</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {result.months}
                        </div>
                        <div className="text-sm text-muted-foreground">Months</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {result.days}
                        </div>
                        <div className="text-sm text-muted-foreground">Days</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="text-lg font-medium text-foreground">
                        Total: {result.totalDays.toLocaleString()} days old
                      </div>
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

export default AgeCalculator;
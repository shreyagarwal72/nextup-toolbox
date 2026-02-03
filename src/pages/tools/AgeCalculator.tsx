import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import Header from "@/components/Header";

const AgeCalculator = () => {
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
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Age Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your exact age in years, months, and days
            </p>
          </div>

          <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="birthdate" className="text-foreground">Birth Date</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="bg-muted/30"
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
                <div className="p-6 bg-muted/50 rounded-xl space-y-4">
                  <h3 className="text-lg font-semibold text-center text-foreground">
                    Your Age
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="glass-card p-4">
                      <div className="text-3xl font-bold text-primary">
                        {result.years}
                      </div>
                      <div className="text-sm text-muted-foreground">Years</div>
                    </div>
                    <div className="glass-card p-4">
                      <div className="text-3xl font-bold text-primary">
                        {result.months}
                      </div>
                      <div className="text-sm text-muted-foreground">Months</div>
                    </div>
                    <div className="glass-card p-4">
                      <div className="text-3xl font-bold text-primary">
                        {result.days}
                      </div>
                      <div className="text-sm text-muted-foreground">Days</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/30 text-center">
                    <div className="text-lg font-medium text-foreground">
                      Total: <span className="text-primary">{result.totalDays.toLocaleString()}</span> days old
                    </div>
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

export default AgeCalculator;

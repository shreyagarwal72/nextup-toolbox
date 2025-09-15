import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Hash } from "lucide-react";

const NumberToWords = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ];

  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];

  const scales = ["", "thousand", "million", "billion", "trillion"];

  const convertHundreds = (num: number): string => {
    let result = "";
    
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + " hundred";
      num %= 100;
      if (num > 0) result += " ";
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      num %= 10;
      if (num > 0) result += "-" + ones[num];
    } else if (num > 0) {
      result += ones[num];
    }
    
    return result;
  };

  const numberToWords = (num: number): string => {
    if (num === 0) return "zero";
    if (num < 0) return "negative " + numberToWords(-num);

    let result = "";
    let scaleIndex = 0;

    while (num > 0) {
      const chunk = num % 1000;
      if (chunk !== 0) {
        const chunkWords = convertHundreds(chunk);
        if (scaleIndex > 0) {
          result = chunkWords + " " + scales[scaleIndex] + (result ? " " + result : "");
        } else {
          result = chunkWords;
        }
      }
      num = Math.floor(num / 1000);
      scaleIndex++;
    }

    return result;
  };

  const handleConvert = () => {
    const cleanNumber = number.replace(/,/g, "").trim();
    const num = parseFloat(cleanNumber);
    
    if (isNaN(num)) {
      setResult("Please enter a valid number");
      return;
    }
    
    if (num > 999999999999999) {
      setResult("Number too large (maximum: 999,999,999,999,999)");
      return;
    }

    if (num < -999999999999999) {
      setResult("Number too small (minimum: -999,999,999,999,999)");
      return;
    }

    // Handle decimal numbers
    if (num % 1 !== 0) {
      const [integerPart, decimalPart] = cleanNumber.split('.');
      const integerWords = numberToWords(parseInt(integerPart));
      const decimalWords = decimalPart.split('').map(digit => ones[parseInt(digit)]).join(' ');
      setResult(integerWords + " point " + decimalWords);
    } else {
      setResult(numberToWords(Math.floor(num)));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const formatNumber = (value: string) => {
    const cleanValue = value.replace(/[^\d.-]/g, "");
    const parts = cleanValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Hash className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Number to Words</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Convert any number into English words for checks and documents
            </p>
          </div>

          <Card className="tool-card mb-6">
            <CardHeader>
              <CardTitle>Number Converter</CardTitle>
              <CardDescription>Enter a number to convert it to words</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter Number</label>
                <Input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="123456.78"
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Formatted: {number ? formatNumber(number) : "Enter a number"}
                </p>
              </div>

              <Button onClick={handleConvert} className="btn-hero w-full">
                Convert to Words
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="tool-card">
              <CardHeader>
                <CardTitle>Result</CardTitle>
                <CardDescription>Number converted to words</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg min-h-[80px] flex items-center">
                  <p className="text-lg capitalize leading-relaxed">
                    {result}
                  </p>
                </div>
                
                <Button onClick={copyToClipboard} variant="outline" className="w-full">
                  Copy to Clipboard
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="tool-card mt-6">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Whole Numbers:</h4>
                  <div className="text-sm space-y-1">
                    <div>123 → one hundred twenty-three</div>
                    <div>1,000 → one thousand</div>
                    <div>1,234,567 → one million two hundred thirty-four thousand five hundred sixty-seven</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Decimal Numbers:</h4>
                  <div className="text-sm space-y-1">
                    <div>123.45 → one hundred twenty-three point four five</div>
                    <div>0.5 → zero point five</div>
                    <div>-100 → negative one hundred</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NumberToWords;
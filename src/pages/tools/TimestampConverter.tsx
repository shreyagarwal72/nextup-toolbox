import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Copy, RefreshCw, ArrowRightLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState("");
  const [dateString, setDateString] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) {
      toast({ title: "Error", description: "Invalid timestamp", variant: "destructive" });
      return;
    }
    // Check if it's seconds or milliseconds
    const date = ts > 1e12 ? new Date(ts) : new Date(ts * 1000);
    setDateString(date.toISOString());
  };

  const dateToTimestamp = () => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      toast({ title: "Error", description: "Invalid date", variant: "destructive" });
      return;
    }
    setTimestamp(date.getTime().toString());
  };

  const useCurrentTimestamp = () => {
    setTimestamp(currentTimestamp.toString());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Value copied to clipboard" });
  };

  const formatCurrentTime = () => {
    return new Date(currentTimestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="icon-glass w-fit mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Timestamp Converter</h1>
            <p className="text-muted-foreground">
              Convert between Unix timestamps and human-readable dates
            </p>
          </div>

          {/* Current Time Display */}
          <Card className="glass-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Current Time</p>
                <p className="text-2xl font-bold text-foreground mb-1">{formatCurrentTime()}</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <code className="bg-muted px-3 py-1 rounded-lg text-sm font-mono">
                    {currentTimestamp}
                  </code>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => copyToClipboard(currentTimestamp.toString())}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Timestamp to Date */}
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>Timestamp → Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="text"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="Enter Unix timestamp..."
                  className="font-mono"
                />
                <div className="flex gap-2">
                  <Button onClick={useCurrentTimestamp} variant="outline" className="btn-glass">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Use Current
                  </Button>
                  <Button onClick={timestampToDate} className="btn-hero flex-1">
                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                    Convert
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Date to Timestamp */}
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>Date → Timestamp</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="datetime-local"
                  value={dateString ? dateString.slice(0, 16) : ""}
                  onChange={(e) => setDateString(e.target.value)}
                  className="font-mono"
                />
                <Button onClick={dateToTimestamp} className="btn-hero w-full">
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Convert
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          {(dateString || timestamp) && (
            <Card className="glass-card mt-6 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {timestamp && (
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Timestamp (ms)</p>
                      <div className="flex items-center justify-between">
                        <code className="font-mono text-foreground">{timestamp}</code>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(timestamp)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {dateString && (
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">ISO Date</p>
                      <div className="flex items-center justify-between">
                        <code className="font-mono text-foreground text-sm">{dateString}</code>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(dateString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimestampConverter;

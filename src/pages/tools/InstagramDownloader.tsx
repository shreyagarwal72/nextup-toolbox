import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Instagram, Download, AlertCircle } from "lucide-react";

const InstagramDownloader = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url) {
      setError("Please enter an Instagram URL");
      return;
    }

    if (!url.includes("instagram.com")) {
      setError("Please enter a valid Instagram URL");
      return;
    }

    setLoading(true);
    setError("");

    // Note: This is a demo implementation
    // In a real app, you would need a backend service to handle Instagram downloads
    // due to CORS and Instagram's API restrictions
    setTimeout(() => {
      setLoading(false);
      setError("Download functionality requires a backend service due to Instagram's API restrictions. This is a demo interface.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Instagram Downloader</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Download Instagram videos and images quickly and easily
            </p>
          </div>

          <Card className="tool-card mb-6">
            <CardHeader>
              <CardTitle>Download Instagram Media</CardTitle>
              <CardDescription>
                Enter the Instagram post URL to download photos and videos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Instagram URL</label>
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.instagram.com/p/..."
                  className="w-full"
                />
              </div>

              <Button 
                onClick={handleDownload}
                disabled={loading || !url}
                className="btn-hero w-full"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Media
                  </div>
                )}
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card className="tool-card">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Copy Instagram URL</h3>
                    <p className="text-sm text-muted-foreground">
                      Go to the Instagram post you want to download and copy the URL from your browser's address bar
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Paste URL</h3>
                    <p className="text-sm text-muted-foreground">
                      Paste the Instagram URL in the input field above
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Download</h3>
                    <p className="text-sm text-muted-foreground">
                      Click the download button to save the media to your device
                    </p>
                  </div>
                </div>
              </div>

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Note:</strong> This tool respects Instagram's terms of service. Only download content you have permission to use.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstagramDownloader;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AgeCalculator from "./pages/tools/AgeCalculator";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import WordCounter from "./pages/tools/WordCounter";
import CaseConverter from "./pages/tools/CaseConverter";
import ColorPicker from "./pages/tools/ColorPicker";
import EmojiPicker from "./pages/tools/EmojiPicker";
import FindReplace from "./pages/tools/FindReplace";
import TextSummarizer from "./pages/tools/TextSummarizer";
import URLEncoder from "./pages/tools/URLEncoder";
import TextReverser from "./pages/tools/TextReverser";
import LoremGenerator from "./pages/tools/LoremGenerator";
import NumberToWords from "./pages/tools/NumberToWords";
import QRGenerator from "./pages/tools/QRGenerator";
import UsernameGenerator from "./pages/tools/UsernameGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        <Route path="/age-calculator" element={<AgeCalculator />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/word-counter" element={<WordCounter />} />
        <Route path="/case-converter" element={<CaseConverter />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/emoji-picker" element={<EmojiPicker />} />
        <Route path="/find-replace" element={<FindReplace />} />
        
        <Route path="/lorem-generator" element={<LoremGenerator />} />
        <Route path="/number-to-words" element={<NumberToWords />} />
        <Route path="/qr-generator" element={<QRGenerator />} />
          <Route path="/username-generator" element={<UsernameGenerator />} />
          <Route path="/text-summarizer" element={<TextSummarizer />} />
          <Route path="/url-encoder" element={<URLEncoder />} />
          <Route path="/text-reverser" element={<TextReverser />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

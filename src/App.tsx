import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
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
import UUIDGenerator from "./pages/tools/UUIDGenerator";
import JSONFormatter from "./pages/tools/JSONFormatter";
import TimestampConverter from "./pages/tools/TimestampConverter";
import HashGenerator from "./pages/tools/HashGenerator";
import TextDiff from "./pages/tools/TextDiff";
import ListSorter from "./pages/tools/ListSorter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="nextup-tools-theme">
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
            <Route path="/uuid-generator" element={<UUIDGenerator />} />
            <Route path="/json-formatter" element={<JSONFormatter />} />
            <Route path="/timestamp-converter" element={<TimestampConverter />} />
            <Route path="/hash-generator" element={<HashGenerator />} />
            <Route path="/text-diff" element={<TextDiff />} />
            <Route path="/list-sorter" element={<ListSorter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

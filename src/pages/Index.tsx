import { useNavigate } from "react-router-dom";
import { 
  Calculator, 
  Type, 
  Palette, 
  Smile, 
  Search, 
  Instagram, 
  FileText, 
  Hash, 
  Shield, 
  QrCode, 
  User, 
  RotateCcw, 
  FileSearch, 
  Link2, 
  Fingerprint,
  Code,
  Clock,
  Diff,
  ListOrdered
} from "lucide-react";
import IntroScreen from "@/components/IntroScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import MoreToolsSection from "@/components/MoreToolsSection";
import InstallPWA from "@/components/InstallPWA";

const Index = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Age & Unit Calculator",
      description: "Calculate your age or convert units easily with precision and detailed breakdowns.",
      icon: Calculator,
      path: "/age-calculator",
      available: true,
    },
    {
      title: "Case Converter",
      description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, and more formats.",
      icon: Type,
      path: "/case-converter",
      available: true,
    },
    {
      title: "Color Picker & Converter",
      description: "Pick colors and convert between Hex, RGB, HSL, and other color formats.",
      icon: Palette,
      path: "/color-picker",
      available: true,
    },
    {
      title: "Emoji Picker",
      description: "Find and copy emojis easily with search and category filtering.",
      icon: Smile,
      path: "/emoji-picker",
      available: true,
    },
    {
      title: "Find & Replace",
      description: "Find words in text and replace them instantly with advanced options.",
      icon: Search,
      path: "/find-replace",
      available: true,
    },
    {
      title: "Hash Generator",
      description: "Generate hash values from text using various hashing algorithms.",
      icon: Hash,
      path: "/hash-generator",
      available: true,
    },
    {
      title: "Instagram Downloader",
      description: "Download Instagram videos and images quickly and easily.",
      icon: Instagram,
      path: "https://instagram-video-downloader-gray.vercel.app/",
      available: true,
      external: true,
    },
    {
      title: "JSON Formatter",
      description: "Format, beautify, and minify your JSON data with syntax validation.",
      icon: Code,
      path: "/json-formatter",
      available: true,
    },
    {
      title: "List Sorter",
      description: "Sort, shuffle, reverse, and organize lists with various options.",
      icon: ListOrdered,
      path: "/list-sorter",
      available: true,
    },
    {
      title: "Lorem Ipsum Generator",
      description: "Generate dummy text for your designs and layouts instantly.",
      icon: FileText,
      path: "/lorem-generator",
      available: true,
    },
    {
      title: "Number to Words",
      description: "Convert any number into English words for checks and documents.",
      icon: Hash,
      path: "/number-to-words",
      available: true,
    },
    {
      title: "Password Generator",
      description: "Generate strong, secure passwords with customizable options and strength meter.",
      icon: Shield,
      path: "/password-generator",
      available: true,
    },
    {
      title: "QR Generator",
      description: "Create QR codes from any text, URL, or data with customizable styling.",
      icon: QrCode,
      path: "/qr-generator",
      available: true,
    },
    {
      title: "Random Username Generator",
      description: "Generate unique usernames quickly for social media and accounts.",
      icon: User,
      path: "/username-generator",
      available: true,
    },
    {
      title: "Text Diff Checker",
      description: "Compare two texts and see the differences highlighted line by line.",
      icon: Diff,
      path: "/text-diff",
      available: true,
    },
    {
      title: "Text Reverser",
      description: "Reverse any text instantly character by character or word by word.",
      icon: RotateCcw,
      path: "/text-reverser",
      available: true,
    },
    {
      title: "Text Summarizer",
      description: "Summarize long text into short key points using AI technology.",
      icon: FileSearch,
      path: "/text-summarizer",
      available: true,
    },
    {
      title: "Timestamp Converter",
      description: "Convert between Unix timestamps and human-readable dates instantly.",
      icon: Clock,
      path: "/timestamp-converter",
      available: true,
    },
    {
      title: "URL Encoder/Decoder",
      description: "Encode or decode any URL instantly for web development needs.",
      icon: Link2,
      path: "/url-encoder",
      available: true,
    },
    {
      title: "UUID Generator",
      description: "Generate unique Universal Unique Identifiers (UUID v4) for your projects.",
      icon: Fingerprint,
      path: "/uuid-generator",
      available: true,
    },
    {
      title: "Word Counter",
      description: "Count words, characters, paragraphs, and get reading time estimates.",
      icon: FileText,
      path: "/word-counter",
      available: true,
    },
  ];

  const handleToolClick = (path: string, available: boolean, external?: boolean) => {
    if (available) {
      if (external) {
        window.open(path, '_blank');
      } else {
        navigate(path);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <IntroScreen />
      <Header />
      
      <main className="container mx-auto px-4 py-12 pt-28">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            All Webtools in One Place
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="gradient-text">Tool</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional web tools designed for efficiency. Select any tool below to get started.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={tool.path}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ToolCard
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                onClick={() => handleToolClick(tool.path, tool.available, tool.external)}
                comingSoon={!tool.available}
              />
            </div>
          ))}
        </div>
      </main>
      
      <MoreToolsSection />
      <Footer />
      <InstallPWA />
    </div>
  );
};

export default Index;

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
  Download,
  Youtube
} from "lucide-react";
import IntroScreen from "@/components/IntroScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";

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
      title: "Instagram Downloader",
      description: "Download Instagram videos and images quickly and easily.",
      icon: Instagram,
      path: "https://instagram-video-downloader-gray.vercel.app/",
      available: true,
      external: true,
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
      title: "URL Encoder/Decoder",
      description: "Encode or decode any URL instantly for web development needs.",
      icon: Link2,
      path: "/url-encoder",
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
      
      
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choose Your Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional web tools designed for efficiency. Select any tool below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={tool.path}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
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
      
      <Footer />
    </div>
  );
};

export default Index;

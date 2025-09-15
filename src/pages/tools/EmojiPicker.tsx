import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Smile } from "lucide-react";

const EmojiPicker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

  const emojiCategories = {
    "Smileys & People": [
      "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩",
      "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔",
      "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😮", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮",
    ],
    "Animals & Nature": [
      "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵",
      "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗",
      "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷️", "🕸️", "🦂", "🐢", "🐍", "🦎",
    ],
    "Food & Drink": [
      "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝",
      "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠", "🥐",
      "🥖", "🍞", "🥨", "🥯", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭",
    ],
    "Activities": [
      "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍",
      "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛷", "⛸️", "🥌", "🎿",
      "⛷️", "🏂", "🪂", "🏋️", "🤼", "🤸", "⛹️", "🤺", "🏊", "🏄", "🏇", "🚴", "🚵", "🧗", "🤾", "🏌️",
    ],
    "Travel & Places": [
      "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🏍️", "🛵",
      "🚲", "🛴", "🛺", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "🚟", "🚃", "🚋", "🚞", "🚝", "🚄",
      "🚅", "🚈", "🚂", "🚆", "🚇", "🚊", "🚉", "✈️", "🛫", "🛬", "🛩️", "💺", "🛰️", "🚀", "🛸", "🚁",
    ],
    "Objects": [
      "⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼",
      "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "🧭",
      "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸",
    ],
  };

  const filteredEmojis = Object.entries(emojiCategories).reduce((acc, [category, emojis]) => {
    const filtered = emojis.filter(emoji => 
      searchTerm === "" || 
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, string[]>);

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
    setTimeout(() => setCopiedEmoji(null), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Smile className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Emoji Picker</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Find and copy emojis easily with search and categories
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search Emojis</CardTitle>
              <CardDescription>Search by category or browse through all emojis</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Search emoji categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            {Object.entries(filteredEmojis).map(([category, emojis]) => (
              <Card key={category} className="tool-card">
                <CardHeader>
                  <CardTitle className="text-xl">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={`${emoji}-${index}`}
                        onClick={() => copyEmoji(emoji)}
                        className={`w-12 h-12 text-2xl rounded-lg border border-border hover:bg-accent hover:scale-110 transition-all duration-200 flex items-center justify-center ${
                          copiedEmoji === emoji ? 'bg-primary text-primary-foreground' : ''
                        }`}
                        title={`Copy ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {copiedEmoji && (
            <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg animate-fade-in">
              Copied {copiedEmoji} to clipboard!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmojiPicker;
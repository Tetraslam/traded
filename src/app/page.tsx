"use client";

import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { CardEditor } from "@/components/CardEditor";
import { ThemeToggle } from "@/components/ThemeToggle";
import { type CardData, TradingCard } from "@/components/TradingCard";

export default function Home() {
  const [cardData, setCardData] = useState<CardData>({
    name: "Shresht Bhowmick",
    fromCompany: "Northeastern",
    toCompany: "Natural",
  });
  const [cardTheme, setCardTheme] = useState<"light" | "dark">("light");

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      await document.fonts.ready;
      
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true,
      });

      const link = document.createElement("a");
      const themeSuffix = cardTheme === "dark" ? "_dark" : "";
      link.download = `${cardData.name.replace(/\s+/g, "_")}_trading_card${themeSuffix}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating card:", error);
      alert("Failed to generate card. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header with theme toggle */}
      <div className="flex justify-end px-8 pt-4">
        <ThemeToggle />
      </div>

      <div className="px-8 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            softmax trading cards
          </h1>
          <p className="text-muted-foreground text-xs">
            tbpn-style trading cards
          </p>
        </div>

        <div className="flex gap-12 justify-center items-stretch">
          {/* Editor */}
          <div className="w-[420px]">
            <CardEditor
              data={cardData}
              onChange={setCardData}
              onDownload={handleDownload}
              cardTheme={cardTheme}
              onCardThemeChange={setCardTheme}
            />
          </div>

          {/* Preview - scale to match editor height */}
          <div className="relative" style={{ height: 'fit-content' }}>
            <div className="relative" style={{ width: '360px', height: '450px' }}>
              <div className="absolute inset-0" style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '600px', height: '750px' }}>
                <TradingCard ref={cardRef} data={cardData} theme={cardTheme} />
              </div>
              <div className="absolute inset-0 pointer-events-none border-2 border-border shadow-2xl rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-2 mt-26 text-center border-t border-border">
        <a 
          href="https://softmax.house" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          made at softmax.house
        </a>
      </div>
    </div>
  );
}

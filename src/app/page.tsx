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
    toCompany: "Vanta",
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

      <div className="flex-1 flex flex-col px-8 pb-8">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            softmax trading cards
          </h1>
          <p className="text-muted-foreground text-sm">
            for when everyone at the house is so cracked they deserve their own
            trading card
          </p>
          <p className="text-muted-foreground/60 text-xs italic">
            (inspired by TBPN, but actually good)
          </p>
        </div>

        <div className="flex-1 flex gap-12 justify-center items-center">
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

          {/* Preview - isolate from site theme */}
          <div className="relative scale-[0.75]">
            <TradingCard ref={cardRef} data={cardData} theme={cardTheme} />
            <div className="absolute inset-0 pointer-events-none border-2 border-border shadow-2xl rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

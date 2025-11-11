"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type CardData } from "./TradingCard";
import { formatCompensation, addCommasToInput } from "@/lib/formatCompensation";
import { useState } from "react";

interface CardEditorProps {
  data: CardData;
  onChange: (data: CardData) => void;
  onDownload: () => void;
  cardTheme: "light" | "dark";
  onCardThemeChange: (theme: "light" | "dark") => void;
}

export function CardEditor({ data, onChange, onDownload, cardTheme, onCardThemeChange }: CardEditorProps) {
  const [compensationInput, setCompensationInput] = useState("");
  const [equityInput, setEquityInput] = useState("");

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "photo" | "fromLogo" | "toLogo"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          ...data,
          [field]: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompensationChange = (value: string) => {
    const formatted = addCommasToInput(value);
    setCompensationInput(formatted);
    
    const finalFormatted = formatCompensation(value);
    onChange({
      ...data,
      compensation: finalFormatted || undefined,
    });
  };

  const handleEquityChange = (value: string) => {
    setEquityInput(value);
    onChange({
      ...data,
      equity: value || undefined,
    });
  };

  return (
    <div className="w-full bg-card border border-border rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 className="text-base font-medium">Edit Card</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onCardThemeChange("light")}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              cardTheme === "light" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => onCardThemeChange("dark")}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              cardTheme === "dark" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1.5 col-span-2">
            <Label htmlFor="name" className="text-xs font-medium">Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              placeholder="e.g., Shresht Bhowmick"
              className="h-9"
            />
          </div>

          {/* Photo */}
          <div className="space-y-1.5 col-span-2">
            <Label htmlFor="photo" className="text-xs font-medium">Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "photo")}
              className="h-9 text-xs cursor-pointer"
            />
          </div>

          {/* From & To */}
          <div className="space-y-1.5">
            <Label htmlFor="fromCompany" className="text-xs font-medium">From</Label>
            <Input
              id="fromCompany"
              value={data.fromCompany}
              onChange={(e) => onChange({ ...data, fromCompany: e.target.value })}
              placeholder="Northeastern"
              className="h-9"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="toCompany" className="text-xs font-medium">To</Label>
            <Input
              id="toCompany"
              value={data.toCompany}
              onChange={(e) => onChange({ ...data, toCompany: e.target.value })}
              placeholder="OpenAI"
              className="h-9"
            />
          </div>

          {/* Logos */}
          <div className="space-y-1.5">
            <Label htmlFor="fromLogo" className="text-xs font-medium text-muted-foreground">From Logo <span className="text-xs">(optional)</span></Label>
            <Input
              id="fromLogo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "fromLogo")}
              className="h-9 text-xs cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="toLogo" className="text-xs font-medium text-muted-foreground">To Logo <span className="text-xs">(optional)</span></Label>
            <Input
              id="toLogo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "toLogo")}
              className="h-9 text-xs cursor-pointer"
            />
          </div>

          {/* Compensation & Equity */}
          <div className="space-y-1.5">
            <Label htmlFor="compensation" className="text-xs font-medium text-muted-foreground">Bonus <span className="text-xs">(optional)</span></Label>
            <Input
              id="compensation"
              value={compensationInput}
              onChange={(e) => handleCompensationChange(e.target.value)}
              placeholder="100000000"
              className="h-9"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="equity" className="text-xs font-medium text-muted-foreground">Equity <span className="text-xs">(optional)</span></Label>
            <Input
              id="equity"
              value={equityInput}
              onChange={(e) => handleEquityChange(e.target.value)}
              placeholder="1%"
              className="h-9"
            />
          </div>
        </div>

        {/* Preview text */}
        {(data.compensation || data.equity) && (
          <p className="text-xs text-muted-foreground pt-2">
            Shows as: <span className="font-medium">
              {data.compensation}
              {data.compensation && data.equity && " + "}
              {data.equity && `${data.equity} equity`}
            </span>
          </p>
        )}

        {/* Download Button */}
        <Button 
          onClick={onDownload} 
          className="w-full mt-2 h-10"
        >
          Download Card
        </Button>
      </div>
    </div>
  );
}

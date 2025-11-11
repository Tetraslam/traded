"use client";

import Image from "next/image";
import { forwardRef } from "react";

export interface CardData {
  name: string;
  photo?: string;
  fromCompany: string;
  toCompany: string;
  fromLogo?: string;
  toLogo?: string;
  compensation?: string;
  equity?: string;
  role?: string;
}

interface TradingCardProps {
  data: CardData;
  theme?: "light" | "dark";
}

export const TradingCard = forwardRef<HTMLDivElement, TradingCardProps>(
  ({ data, theme = "light" }, ref) => {
    return (
      <div
        ref={ref}
        data-card="true"
        className={`relative w-[600px] h-[750px] overflow-hidden flex flex-col select-none ${theme === "dark" ? "dark" : "light"}`}
        style={{ 
          backgroundColor: theme === "dark" ? "oklch(0.18 0.01 60)" : "oklch(0.98 0.005 85)",
          fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        {/* Top decorative element */}
        <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: theme === "dark" ? "oklch(0.65 0.12 50)" : "oklch(0.45 0.08 45)", opacity: 0.3 }} />

        <div className="flex flex-col h-full px-12 pt-14 pb-6">
          {/* Photo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-52 h-52 rounded-lg overflow-hidden bg-muted">
              {data.photo ? (
                <Image
                  src={data.photo}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">No Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <h1 className="text-5xl font-semibold text-center mb-3 text-foreground" style={{ letterSpacing: "-0.025em" }}>
            {data.name}
          </h1>

          {/* Company transition */}
          <div className="flex items-center justify-center gap-3 text-base mb-8 text-muted-foreground">
            <span className="font-medium">{data.fromCompany}</span>
            <span>→</span>
            <span className="font-medium">{data.toCompany}</span>
          </div>

          {/* Divider */}
          <div className="h-px mb-8 bg-border" />

          {/* Compensation */}
          {(data.compensation || data.equity) && (
            <div className="text-center mb-8">
              <div className="text-xs uppercase mb-2 font-medium text-muted-foreground" style={{ letterSpacing: "0.1em" }}>
                Package
              </div>
              <div className="text-3xl font-semibold text-primary" style={{ letterSpacing: "-0.025em" }}>
                {data.compensation}
                {data.compensation && data.equity && ` + ${data.equity} equity`}
                {!data.compensation && data.equity && `${data.equity} equity`}
              </div>
            </div>
          )}

          {/* Company logos */}
          {(data.fromLogo || data.toLogo) && (
            <div className="flex items-center justify-center gap-12 py-5 px-8 rounded-lg mb-8 bg-card border border-border">
              {data.fromLogo && (
                <div className="h-14 w-28 relative">
                  <Image
                    src={data.fromLogo}
                    alt={data.fromCompany}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              {data.fromLogo && data.toLogo && (
                <div className="text-2xl text-muted-foreground">→</div>
              )}
              {data.toLogo && (
                <div className="h-14 w-28 relative">
                  <Image
                    src={data.toLogo}
                    alt={data.toCompany}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex-1" />

          {/* Bottom branding */}
          <div className="text-center pt-6 mt-auto border-t border-border">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <title>softmax logo</title>
                <path d="M4 24C4 24 10 24 16 14C22 4 28 4 28 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 28C4 28 10 28 16 18C22 8 28 8 28 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
              </svg>
              <span className="text-xs font-medium tracking-wide">softmax</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

TradingCard.displayName = "TradingCard";

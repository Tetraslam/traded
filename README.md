# softmax trading cards

**for when everyone at the house is so cracked they need their own TBPN-style trading card**

A fun internal tool for [softmax](https://softmax.house) residents to create trading cards for each other, because let's be real - we're all getting poached eventually.

## Why This Exists

Everyone at softmax is exceptionally talented at what they do. When the inevitable $100M+ sign-on bonuses start rolling in (looking at you, AI researchers and founding engineers), we wanted a way to commemorate the moment with TBPN-style trading cards.

## Stack
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- html2canvas for card downloads
- pnpm

## Features
- Live preview as you edit
- Upload photos and company logos
- Smart compensation formatting ($1M, $200K, etc.)
- TBPN-authentic design (green gradient, breaking news banner, scrolling ticker)
- Quick templates for softmax residents
- Download as high-quality PNG (2x resolution)
- Warm, cozy UI matching softmax aesthetic

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to start making cards.

## Quick Templates

The app includes preset templates for current softmax residents:
- **Shresht**: Northeastern → Natural (founding engineer for AI agent payments)
- **William**: MIT → OpenAI (research resident)

Just click a template and customize from there.

## Usage
1. Enter the person's name (or use a quick template)
2. Upload their photo
3. Enter origin and destination companies
4. Optionally upload company logos (text fallback if you don't)
5. Add sign-on bonus amount (auto-formats to $100M, etc.)
6. Download your masterpiece

## Compensation Formatting
Large numbers auto-format for readability:
- 100000000 → $100M
- 1500000 → $1.5M  
- 200000 → $200K
- As you type, commas appear (100,000,000)

## Project Structure
- `src/components/TradingCard.tsx` - Card component with TBPN design
- `src/components/CardEditor.tsx` - Form with templates
- `src/app/page.tsx` - Main editor interface
- `src/app/globals.css` - Styles + news ticker animation
- `src/lib/formatCompensation.ts` - Number formatting utilities

---

built with love at softmax 🏠
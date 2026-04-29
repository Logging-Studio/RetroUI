"use client";

import { useState } from "react";
import { CopyIcon, ChevronDownIcon, CheckIcon } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface CopyPageButtonProps {
  rawContent: string;
  title: string;
}

export function CopyPageButton({ rawContent, title }: CopyPageButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInClaude = () => {
    const prompt = encodeURIComponent(
      `Here is the documentation for ${title}:\n\n${rawContent}\n\nPlease help me understand this.`
    );
    window.open(`https://claude.ai/new?q=${prompt}`, "_blank");
  };

  const openInChatGPT = () => {
    const prompt = encodeURIComponent(
      `Here is the documentation for ${title}:\n\n${rawContent}\n\nPlease help me understand this.`
    );
    window.open(`https://chat.openai.com/?q=${prompt}`, "_blank");
  };

  return (
    <div className="inline-flex border border-border bg-card shadow">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-1.5 hover:bg-accent transition-colors text-sm font-medium"
        aria-label="Copy page content to clipboard"
      >
        {copied ? (
          <CheckIcon className="h-3.5 w-3.5" />
        ) : (
          <CopyIcon className="h-3.5 w-3.5" />
        )}
        <span>{copied ? "Copied!" : "Copy Page"}</span>
      </button>

      {/* Divider */}
      <div className="w-[1px] bg-border" />

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-2 py-1.5 hover:bg-accent transition-colors focus:ring-none" aria-label="More copy options" aria-haspopup="menu">
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 rounded-none border">
          <DropdownMenuItem onClick={openInClaude} className="h-8">
            <Image src="/images/logos/claude.svg" alt="Claude" width={16} height={16} />
            Open in Claude
          </DropdownMenuItem>

          <DropdownMenuItem onClick={openInChatGPT} className="h-8">
            <Image src="/images/logos/chatgpt.png" alt="ChatGPT" width={16} height={16} />
            Open in ChatGPT
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

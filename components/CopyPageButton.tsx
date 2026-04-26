"use client";

import { useState } from "react";
import { CopyIcon, ChevronDownIcon, CheckIcon } from "lucide-react";

interface CopyPageButtonProps {
  rawContent: string;
  title: string;
}

export function CopyPageButton({ rawContent, title }: CopyPageButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="relative inline-flex">
      {/* Button Group */}
      <div className="inline-flex border-2 border-border bg-card shadow-sm">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 hover:bg-muted transition-colors text-sm font-medium"
        >
          {copied ? (
            <CheckIcon className="h-3.5 w-3.5" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5" />
          )}
          <span>{copied ? "Copied!" : "Copy Page"}</span>
        </button>

        {/* Divider */}
        <div className="w-[2px] bg-border" />

        {/* Dropdown Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-2 py-1.5 hover:bg-muted transition-colors"
        >
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-1 w-48 border-2 border-border bg-card shadow-md z-20">
            <button
              onClick={() => {
                openInClaude();
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 2H9.5C8.67157 2 8 2.67157 8 3.5V4.5C8 5.32843 8.67157 6 9.5 6H14.5C15.3284 6 16 5.32843 16 4.5V3.5C16 2.67157 15.3284 2 14.5 2Z"
                  fill="currentColor"
                />
                <path
                  d="M12 8C10.3431 8 9 9.34315 9 11V20C9 21.6569 10.3431 23 12 23C13.6569 23 15 21.6569 15 20V11C15 9.34315 13.6569 8 12 8Z"
                  fill="currentColor"
                />
              </svg>
              Open in Claude
            </button>

            <div className="h-[2px] bg-border" />

            <button
              onClick={() => {
                openInChatGPT();
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.2819 9.8211C22.9528 10.4921 22.9528 11.5742 22.2819 12.2452L13.7181 20.8089C13.0471 21.4799 11.965 21.4799 11.294 20.8089C10.623 20.1379 10.623 19.0558 11.294 18.3848L18.6461 11.0327L11.294 3.68055C10.623 3.00958 10.623 1.92748 11.294 1.25651C11.965 0.585537 13.0471 0.585537 13.7181 1.25651L22.2819 9.8211ZM2.21808 9.8211C2.88906 10.4921 2.88906 11.5742 2.21808 12.2452L10.7819 20.8089C11.4528 21.4799 12.535 21.4799 13.206 20.8089C13.8769 20.1379 13.8769 19.0558 13.206 18.3848L5.85385 11.0327L13.206 3.68055C13.8769 3.00958 13.8769 1.92748 13.206 1.25651C12.535 0.585537 11.4528 0.585537 10.7819 1.25651L2.21808 9.8211Z" />
              </svg>
              Open in ChatGPT
            </button>
          </div>
        </>
      )}
    </div>
  );
}

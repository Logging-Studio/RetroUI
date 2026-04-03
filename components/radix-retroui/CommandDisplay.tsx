"use client";

import { ClipboardIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

interface CommandDisplayProps {
  command: string;
}

export function CommandDisplay({ command }: CommandDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const defaultColors = [
    "text-blue-300",
    "text-yellow-300",
    "text-green-300",
    "text-purple-300",
  ];

  // Split the command into parts for syntax highlighting
  const parts = command.split(" ").map((part, index) => {
    const color = defaultColors[index % defaultColors.length];
    return (
      <span key={index} className={color}>
        {part}
      </span>
    );
  });

  return (
    <div className="relative group flex items-center bg-black/90 pl-4 py-2 font-mono text-xs">
      <div className="flex-1 whitespace-nowrap overflow-hidden">
        <div className="overflow-hidden text-ellipsis">
          {parts.map((part, index) => (
            <span key={`part-${index}`}>
              {part}
              {index < parts.length - 1 && " "}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={copyToClipboard}
        className="mr-2 p-1 shrink-0 text-gray-400 hover:text-white transition-colors"
        aria-label="Copy command"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-green-400" />
        ) : (
          <ClipboardIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

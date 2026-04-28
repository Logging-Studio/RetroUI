"use client";

import { useState } from "react";
import { authApi } from "@/lib/api-client";
import { getAuthToken } from "@/lib/auth";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  slug: string;
  templateName: string;
}

export function DownloadButton({ slug, templateName }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setError(null);

      const token = await getAuthToken();
      if (!token) {
        setError("Please sign in to download");
        return;
      }

      const result = await authApi.downloadTemplate(slug, token);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.downloadUrl) {
        window.location.href = result.downloadUrl;
      }
    } catch (err) {
      setError("Failed to download template");
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <div className="relative inline-block group">
        <div className="absolute -bottom-1.5 -right-1.5 left-1.5 top-1.5 border-2 bg-primary transition-all duration-200" />
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-6 py-2 font-head border-2 transition-all duration-200 relative bg-card shadow-none group-hover:translate-x-1 group-hover:translate-y-1 hover:shadow-none active:translate-x-1.5 active:translate-y-1.5 whitespace-nowrap flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? "Downloading..." : "Download Template"}
        </button>
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}

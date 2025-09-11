"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, RefreshCw } from "lucide-react";

interface CodePreviewProps {
  html: string;
  title?: string;
  isLoading?: boolean;
}

export function CodePreview({ html, title, isLoading }: CodePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && html) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(html);
  };

  const handleOpenInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px] bg-muted/30 rounded-xl border border-border/50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Generating code...</p>
        </div>
      </div>
    );
  }

  if (!html) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px] bg-muted/30 rounded-xl border border-border/50">
        <div className="text-center">
          <div className="text-4xl mb-4">🎨</div>
          <p className="text-sm text-muted-foreground">
            Generated code will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-foreground">
            {title || "Generated Code"}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-7 w-7 p-0"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyCode}
            className="h-7 w-7 p-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOpenInNewTab}
            className="h-7 w-7 p-0"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0 bg-white rounded-b-xl"
          sandbox="allow-scripts allow-same-origin"
          title="Generated Code Preview"
        />
      </div>
    </div>
  );
}
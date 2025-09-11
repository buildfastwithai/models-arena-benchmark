"use client";

import { CodePreview } from "@/components/CodePreview";
import { ModelSelect } from "@/components/ModelSelect";
import { RefreshCw, MessageSquare } from "lucide-react";

interface GenerationResult {
  model: string;
  success: boolean;
  data?: { html: string; title: string };
  error?: string;
}

interface ModelPanelProps {
  model: string;
  setModel: (model: string) => void;
  result: GenerationResult | null;
  loading: boolean;
  setPrompt: (prompt: string) => void;
}

export function ModelPanel({
  model,
  setModel,
  result,
  loading,
  setPrompt,
}: ModelPanelProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-border bg-muted/20">
        <ModelSelect value={model} onValueChange={setModel} />
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        {loading ? (
          <CodePreview html="" isLoading={true} />
        ) : result ? (
          result.success ? (
            <CodePreview html={result.data!.html} title={result.data!.title} />
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="text-red-800 font-medium mb-2">
                Generation Failed
              </div>
              <div className="text-red-600 text-sm">{result.error}</div>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center max-w-md">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-sm mb-6 text-balance">
                Click and try one of these prompts:
              </p>
              <div className="space-y-3 text-left">
                <div
                  className="p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/50"
                  onClick={() => setPrompt("Create a ping pong game in HTML")}
                >
                  <p className="text-sm text-foreground">
                    Create a ping pong game in HTML
                  </p>
                </div>
                <div
                  className="p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/50"
                  onClick={() =>
                    setPrompt("Build a calculator with a modern design")
                  }
                >
                  <p className="text-sm text-foreground">
                    Build a calculator with a modern design
                  </p>
                </div>
                <div
                  className="p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/50"
                  onClick={() => setPrompt("Create a todo app with animations")}
                >
                  <p className="text-sm text-foreground">
                    Create a todo app with animations
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

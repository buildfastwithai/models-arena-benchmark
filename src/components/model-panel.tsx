"use client";

import { CodePreview } from "@/components/code-preview";
import { ModelPanelHeader } from "@/components/model-panel-header";
import { MessageSquare } from "lucide-react";

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
  onRemove?: () => void;
  onAdd?: () => void;
  canRemove: boolean;
  isLast: boolean;
}

export function ModelPanel({
  model,
  setModel,
  result,
  loading,
  setPrompt,
  onRemove,
  onAdd,
  canRemove,
  isLast,
}: ModelPanelProps) {
  return (
    <div className="flex-1 flex flex-col">
      <ModelPanelHeader
        model={model}
        setModel={setModel}
        onRemove={onRemove}
        onAdd={onAdd}
        canRemove={canRemove}
        isLast={isLast}
      />

      <div className="flex-1 p-4 overflow-hidden">
        {loading ? (
          <CodePreview html="" isLoading={true} />
        ) : result ? (
          result.success ? (
            <CodePreview html={result.data!.html} title={result.data!.title} />
          ) : (
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 shadow-lg">
              <div className="text-red-800 font-medium mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Generation Failed
              </div>
              <div className="text-red-600 text-sm">{result.error}</div>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl"></div>
                <MessageSquare className="relative h-12 w-12 mx-auto mb-4 text-primary" />
              </div>
              <p className="text-sm mb-6 text-balance">
                Click and try one of these prompts:
              </p>
              <div className="space-y-3 text-left">
                <div
                  className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg cursor-pointer hover:from-primary/20 hover:to-secondary/20 transition-all duration-200 border border-primary/20 hover:border-primary/40"
                  onClick={() => setPrompt("Create a ping pong game in HTML")}
                >
                  <p className="text-sm text-foreground font-medium">
                    Create a ping pong game in HTML
                  </p>
                </div>
                <div
                  className="p-4 bg-gradient-to-r from-accent/10 to-chart-4/10 rounded-lg cursor-pointer hover:from-accent/20 hover:to-chart-4/20 transition-all duration-200 border border-accent/20 hover:border-accent/40"
                  onClick={() =>
                    setPrompt("Build a calculator with a modern design")
                  }
                >
                  <p className="text-sm text-foreground font-medium">
                    Build a calculator with a modern design
                  </p>
                </div>
                <div
                  className="p-4 bg-gradient-to-r from-chart-5/10 to-chart-2/10 rounded-lg cursor-pointer hover:from-chart-5/20 hover:to-chart-2/20 transition-all duration-200 border border-chart-5/20 hover:border-chart-5/40"
                  onClick={() => setPrompt("Create a todo app with animations")}
                >
                  <p className="text-sm text-foreground font-medium">
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

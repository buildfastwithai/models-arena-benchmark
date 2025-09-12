"use client";

import { Button } from "@/components/ui/button";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { RotateCcw, Eye, EyeOff } from "lucide-react";

interface PromptBoxProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  promptBoxVisible: boolean;
  setPromptBoxVisible: (visible: boolean) => void;
  loading: boolean;
  model1: string;
  model2: string;
  onSubmit: (message: PromptInputMessage) => void;
  onReset: () => void;
  isMobile?: boolean;
}

export function PromptBox({
  prompt,
  setPrompt,
  promptBoxVisible,
  setPromptBoxVisible,
  loading,
  model1,
  model2,
  onSubmit,
  onReset,
  isMobile = false,
}: PromptBoxProps) {
  return (
    <>
      <Button
        variant="default"
        size="sm"
        onClick={() => setPromptBoxVisible(!promptBoxVisible)}
        className={`absolute z-20 h-10 w-10 rounded-full transition-all duration-200 ${
          isMobile ? "bottom-20 right-2" : "bottom-4 right-4"
        }`}
      >
        {promptBoxVisible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>

      {promptBoxVisible && (
        <div
          className={`absolute bottom-0 left-0 right-0 z-10 ${
            isMobile ? "p-2" : "p-4"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <PromptInput onSubmit={onSubmit}>
              <PromptInputBody>
                <PromptInputTextarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What would you like to build?"
                />
                <PromptInputToolbar>
                  <PromptInputTools>
                    <PromptInputButton
                      variant="ghost"
                      onClick={onReset}
                      disabled={loading}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </PromptInputButton>
                  </PromptInputTools>
                  <PromptInputSubmit
                    disabled={loading || !model1 || !model2}
                    status={loading ? "submitted" : undefined}
                  />
                </PromptInputToolbar>
              </PromptInputBody>
            </PromptInput>
          </div>
        </div>
      )}
    </>
  );
}

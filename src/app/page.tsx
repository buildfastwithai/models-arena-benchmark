"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ModelPanel } from "@/components/ModelPanel";
import { PromptBox } from "@/components/PromptBox";
import { type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { toast } from "sonner";

interface GenerationResult {
  model: string;
  success: boolean;
  data?: { html: string; title: string };
  error?: string;
}

export default function BenchmarkArena() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [model1, setModel1] = useState("openai/gpt-5");
  const [model2, setModel2] = useState("x-ai/grok-code-fast-1");
  const [result1, setResult1] = useState<GenerationResult | null>(null);
  const [result2, setResult2] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [promptBoxVisible, setPromptBoxVisible] = useState(true);

  const handleSubmit = async (message: PromptInputMessage) => {
    if (!apiKey) {
      toast.error("Please enter your OpenRouter API key");
      return;
    }
    if (!message.text || !model1 || !model2) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setResult1(null);
    setResult2(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: message.text,
          models: [model1, model2],
          apiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate code");
      }

      const [result1, result2] = data.results;
      console.log(result1, result2);
      setResult1(result1);
      setResult2(result2);
      setPrompt(message.text || "");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setResult1(null);
    setResult2(null);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 flex divide-x divide-border">
          <ModelPanel
            model={model1}
            setModel={setModel1}
            result={result1}
            loading={loading}
            setPrompt={setPrompt}
          />

          <ModelPanel
            model={model2}
            setModel={setModel2}
            result={result2}
            loading={loading}
            setPrompt={setPrompt}
          />
        </div>

        <PromptBox
          prompt={prompt}
          setPrompt={setPrompt}
          promptBoxVisible={promptBoxVisible}
          setPromptBoxVisible={setPromptBoxVisible}
          loading={loading}
          model1={model1}
          model2={model2}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

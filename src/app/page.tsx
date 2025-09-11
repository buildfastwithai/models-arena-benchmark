"use client";

import { useState, useEffect } from "react";
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

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openrouter-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('openrouter-api-key', key);
    } else {
      localStorage.removeItem('openrouter-api-key');
    }
  };
  const [prompt, setPrompt] = useState("");
  const [model1, setModel1] = useState("openai/gpt-5");
  const [model2, setModel2] = useState("x-ai/grok-code-fast-1");
  const [result1, setResult1] = useState<GenerationResult | null>(null);
  const [result2, setResult2] = useState<GenerationResult | null>(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
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

    setLoading1(true);
    setLoading2(true);
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate code");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.modelIndex === 0) {
                  setResult1(data);
                  setLoading1(false);
                } else if (data.modelIndex === 1) {
                  setResult2(data);
                  setLoading2(false);
                }
              } catch (parseError) {
                console.error('Error parsing streaming data:', parseError);
              }
            }
          }
        }
      }
      
      setPrompt(message.text || "");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setLoading1(false);
      setLoading2(false);
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
        setApiKey={handleApiKeyChange}
      />

      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 flex divide-x divide-border">
          <ModelPanel
            model={model1}
            setModel={setModel1}
            result={result1}
            loading={loading1}
            setPrompt={setPrompt}
          />

          <ModelPanel
            model={model2}
            setModel={setModel2}
            result={result2}
            loading={loading2}
            setPrompt={setPrompt}
          />
        </div>

        <PromptBox
          prompt={prompt}
          setPrompt={setPrompt}
          promptBoxVisible={promptBoxVisible}
          setPromptBoxVisible={setPromptBoxVisible}
          loading={loading1 || loading2}
          model1={model1}
          model2={model2}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

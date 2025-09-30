"use client";

import { useState, useEffect } from "react";
import { ModelPanel } from "@/components/model-panel";
import { PromptBox } from "@/components/prompt-box";
import { type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { toast } from "sonner";
import { Sidebar } from "@/components/Sidebar";

interface GenerationResult {
  model: string;
  success: boolean;
  data?: { html: string; title: string };
  error?: string;
}

interface ModelSection {
  id: string;
  model: string;
  result: GenerationResult | null;
  loading: boolean;
}

export default function BenchmarkArena() {
  const [apiKey, setApiKey] = useState("");

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openrouter-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem("openrouter-api-key", key);
    } else {
      localStorage.removeItem("openrouter-api-key");
    }
  };
  const [prompt, setPrompt] = useState("");
  const [modelSections, setModelSections] = useState<ModelSection[]>([
    {
      id: "1",
      model: "anthropic/claude-sonnet-4.5",
      result: null,
      loading: false,
    },
    {
      id: "2",
      model: "deepseek/deepseek-v3.2-exp",
      result: null,
      loading: false,
    },
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const [promptBoxVisible, setPromptBoxVisible] = useState(true);

  // Helper functions for managing model sections
  const addModelSection = () => {
    const newId = Date.now().toString();
    setModelSections((prev) => [
      ...prev,
      {
        id: newId,
        model: "openai/gpt-4o-mini",
        result: null,
        loading: false,
      },
    ]);
  };

  const removeModelSection = (id: string) => {
    if (modelSections.length > 1) {
      setModelSections((prev) => prev.filter((section) => section.id !== id));
    }
  };

  const updateModelSection = (id: string, updates: Partial<ModelSection>) => {
    setModelSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  const handleSubmit = async (message: PromptInputMessage) => {
    if (!apiKey) {
      toast.error("Please enter your OpenRouter API key");
      return;
    }
    if (!message.text || modelSections.some((section) => !section.model)) {
      toast.error("Please fill in all fields");
      return;
    }

    // Set all sections to loading and clear results
    setModelSections((prev) =>
      prev.map((section) => ({
        ...section,
        loading: true,
        result: null,
      }))
    );

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: message.text,
          models: modelSections.map((section) => section.model),
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
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));

                // Update the corresponding model section
                const sectionId = modelSections[data.modelIndex]?.id;
                if (sectionId) {
                  updateModelSection(sectionId, {
                    result: data,
                    loading: false,
                  });
                }
              } catch (parseError) {
                console.error("Error parsing streaming data:", parseError);
              }
            }
          }
        }
      }

      setPrompt(message.text || "");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
      // Reset all loading states on error
      setModelSections((prev) =>
        prev.map((section) => ({
          ...section,
          loading: false,
        }))
      );
    }
  };

  const handleReset = () => {
    setPrompt("");
    setModelSections((prev) =>
      prev.map((section) => ({
        ...section,
        result: null,
        loading: false,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        apiKey={apiKey}
        setApiKey={handleApiKeyChange}
        isMobile={isMobile}
      />

      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 flex flex-col md:flex-row md:divide-x divide-border overflow-hidden space-y-4 md:space-y-0">
          {modelSections.map((section, index) => (
            <ModelPanel
              key={section.id}
              model={section.model}
              setModel={(model) => updateModelSection(section.id, { model })}
              result={section.result}
              loading={section.loading}
              setPrompt={setPrompt}
              onRemove={() => removeModelSection(section.id)}
              onAdd={addModelSection}
              canRemove={modelSections.length > 1}
              isLast={index === modelSections.length - 1}
            />
          ))}
        </div>

        <PromptBox
          prompt={prompt}
          setPrompt={setPrompt}
          promptBoxVisible={promptBoxVisible}
          setPromptBoxVisible={setPromptBoxVisible}
          loading={modelSections.some((section) => section.loading)}
          model1={modelSections[0]?.model || ""}
          model2={modelSections[1]?.model || ""}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

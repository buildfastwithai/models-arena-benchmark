"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodePreview } from "@/components/CodePreview";
import {
  Settings,
  Send,
  RotateCcw,
  Zap,
  Github,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface GenerationResult {
  model: string;
  success: boolean;
  data?: { html: string; title: string };
  error?: string;
}

export default function BenchmarkArena() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [model1, setModel1] = useState("");
  const [model2, setModel2] = useState("");
  const [result1, setResult1] = useState<GenerationResult | null>(null);
  const [result2, setResult2] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSubmit = async () => {
    if (!apiKey || !prompt || !model1 || !model2) {
      alert("Please fill in all fields");
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
          prompt,
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
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "An error occurred");
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
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-80"
        } border-r border-border bg-card/30 flex flex-col transition-all duration-300 ease-in-out relative`}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border border-border bg-background shadow-sm hover:bg-muted"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>

        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary flex-shrink-0" />
            {!sidebarCollapsed && (
              <h1 className="font-semibold text-foreground text-sm leading-tight">
                BUILD FAST ARENA BENCHMARK
              </h1>
            )}
          </div>
          {!sidebarCollapsed && (
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-hidden">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Settings className="h-4 w-4 flex-shrink-0" />
            {!sidebarCollapsed && <span>CONFIGURATION</span>}
          </div>

          {!sidebarCollapsed && (
            <div className="space-y-3">
              <div>
                <Label
                  htmlFor="api-key"
                  className="text-xs font-medium text-muted-foreground"
                >
                  OpenRouter API Key
                </Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-or-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="mt-1 h-8 text-sm"
                />
              </div>

              <Separator />

              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  Model A
                </Label>
                <Select value={model1} onValueChange={setModel1}>
                  <SelectTrigger className="mt-1 h-8 text-sm">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moonshotai/kimi-k2-0905">
                      Kimi K2 0905
                    </SelectItem>
                    <SelectItem value="x-ai/grok-code-fast-1">
                      Grok Code Fast 1
                    </SelectItem>
                    <SelectItem value="openai/gpt-5">GPT-5</SelectItem>
                    <SelectItem value="google/gemini-2.5-flash">
                      Gemini 2.5 Flash
                    </SelectItem>
                    <SelectItem value="google/gemini-2.5-pro">
                      Gemini 2.5 Pro
                    </SelectItem>
                    <SelectItem value="meta-llama/llama-4-scout">
                      Llama 4 Scout
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  Model B
                </Label>
                <Select value={model2} onValueChange={setModel2}>
                  <SelectTrigger className="mt-1 h-8 text-sm">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moonshotai/kimi-k2-0905">
                      Kimi K2 0905
                    </SelectItem>
                    <SelectItem value="x-ai/grok-code-fast-1">
                      Grok Code Fast 1
                    </SelectItem>
                    <SelectItem value="openai/gpt-5">GPT-5</SelectItem>
                    <SelectItem value="google/gemini-2.5-flash">
                      Gemini 2.5 Flash
                    </SelectItem>
                    <SelectItem value="google/gemini-2.5-pro">
                      Gemini 2.5 Pro
                    </SelectItem>
                    <SelectItem value="meta-llama/llama-4-scout">
                      Llama 4 Scout
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {!sidebarCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs">
                <Github className="h-3 w-3 mr-1" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                Docs
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex">
          <div className="flex-1 border-r border-border flex flex-col">
            <div className="p-4 border-b border-border bg-muted/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-foreground">
                  MODEL A
                </span>
                {loading && (
                  <RefreshCw className="h-3 w-3 animate-spin text-muted-foreground" />
                )}
                <div className="ml-auto">
                  {model1 && (
                    <Badge variant="outline" className="text-xs font-mono">
                      {model1.split("/")[1]}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-hidden">
              {loading ? (
                <CodePreview html="" isLoading={true} />
              ) : result1 ? (
                result1.success ? (
                  <CodePreview
                    html={result1.data!.html}
                    title={result1.data!.title}
                  />
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="text-red-800 font-medium mb-2">
                      Generation Failed
                    </div>
                    <div className="text-red-600 text-sm">{result1.error}</div>
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
                        onClick={() =>
                          setPrompt("Create a ping pong game in HTML")
                        }
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
                        onClick={() =>
                          setPrompt("Create a todo app with animations")
                        }
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

          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-border bg-muted/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-foreground">
                  MODEL B
                </span>
                {loading && (
                  <RefreshCw className="h-3 w-3 animate-spin text-muted-foreground" />
                )}
                <div className="ml-auto">
                  {model2 && (
                    <Badge variant="outline" className="text-xs font-mono">
                      {model2.split("/")[1]}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-hidden">
              {loading ? (
                <CodePreview html="" isLoading={true} />
              ) : result2 ? (
                result2.success ? (
                  <CodePreview
                    html={result2.data!.html}
                    title={result2.data!.title}
                  />
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="text-red-800 font-medium mb-2">
                      Generation Failed
                    </div>
                    <div className="text-red-600 text-sm">{result2.error}</div>
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
                        onClick={() =>
                          setPrompt("Create a ping pong game in HTML")
                        }
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
                        onClick={() =>
                          setPrompt("Create a todo app with animations")
                        }
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
        </div>

        <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-end gap-3 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                disabled={loading}
                className="h-10 w-10"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1">
              <Textarea
                placeholder="Type your message..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[44px] max-h-32 resize-none border-border/50 focus:border-primary/50 bg-background/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              size="sm"
              className="h-10 px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

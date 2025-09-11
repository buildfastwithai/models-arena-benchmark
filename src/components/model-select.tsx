"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const models = [
  { value: "x-ai/grok-code-fast-1", label: "Grok Code Fast 1" },
  { value: "openai/gpt-5", label: "GPT-5" },
  { value: "openai/gpt-oss-120b", label: "GPT-OSS 120B" },
  { value: "anthropic/claude-sonnet-4", label: "Claude Sonnet 4" },
  { value: "anthropic/claude-opus-4.1", label: "Claude Opus 4.1" },
  { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash" },
  { value: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro" },
  { value: "moonshotai/kimi-k2-0905", label: "Kimi K2 0905" },
  { value: "qwen/qwen3-max", label: "Qwen 3 Max" },
  { value: "z-ai/glm-4.5", label: "GLM 4.5" },
  { value: "deepseek/deepseek-chat-v3-0324", label: "DeepSeek Chat V3 0324" },
  { value: "meta-llama/llama-4-scout", label: "Llama 4 Scout" },
  { value: "qwen/qwen3-coder", label: "Qwen 3 Coder" },
];

export function ModelSelect({
  value,
  onValueChange,
  placeholder = "Select model",
}: ModelSelectProps) {
  return (
    <div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="mt-1 h-8 text-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

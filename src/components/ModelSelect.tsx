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
  { value: "moonshotai/kimi-k2-0905", label: "Kimi K2 0905" },
  { value: "x-ai/grok-code-fast-1", label: "Grok Code Fast 1" },
  { value: "openai/gpt-5", label: "GPT-5" },
  { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash" },
  { value: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro" },
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

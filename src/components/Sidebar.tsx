"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  Github,
  Info,
  Minus,
  Plus,
  Settings,
  Zap,
} from "lucide-react";

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  isMobile?: boolean;
}

export function Sidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  apiKey,
  setApiKey,
  isMobile = false,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "border-r border-border bg-gradient-to-b from-card/40 to-card/20 flex flex-col transition-all duration-300 ease-in-out relative backdrop-blur-sm",
        isMobile
          ? sidebarCollapsed
            ? "w-full h-16"
            : "w-full h-auto max-h-[50vh]"
          : sidebarCollapsed
          ? "w-12"
          : "w-80"
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={`absolute z-10 h-6 w-6 rounded-full border border-border bg-background shadow-sm hover:bg-muted ${
          isMobile ? "-right-3 top-2" : "-right-3 top-6"
        }`}
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
        <div
          className={cn(
            "flex items-center gap-2 py-[0.15rem]",
            sidebarCollapsed && "py-2.5"
          )}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm"></div>
            <Zap className="relative h-5 w-5 text-primary flex-shrink-0" />
          </div>
          {!sidebarCollapsed && (
            <h1 className="font-semibold text-foreground text-sm leading-tight">
              BUILD FAST
              <br /> ARENA BENCHMARK
            </h1>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {!isMobile && (
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Settings className="h-4 w-4 flex-shrink-0" />
            {!sidebarCollapsed && <span>CONFIGURATION</span>}
          </div>
        )}

        {!sidebarCollapsed && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label
                  htmlFor="api-key"
                  className="text-xs font-medium text-muted-foreground"
                >
                  OpenRouter API Key
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    window.open("https://openrouter.ai/settings/keys", "_blank")
                  }
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-or-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="h-8 text-sm"
              />
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Info className="h-4 w-4 flex-shrink-0" />
                <span>HOW TO USE</span>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Get API Key
                    </p>
                    <p>
                      Sign up at OpenRouter and get your API key from the
                      settings page.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-accent to-chart-3 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Select Models
                    </p>
                    <p>
                      Choose AI models for comparison. Use{" "}
                      <Plus className="h-3 w-3 inline" /> to add or{" "}
                      <Minus className="h-3 w-3 inline" /> to remove panels.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-chart-4 to-chart-5 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      View Results
                    </p>
                    <p>
                      Toggle <Eye className="h-3 w-3 inline" />/
                      <EyeOff className="h-3 w-3 inline" /> to hide the prompt
                      box for full-size viewing of generated content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!sidebarCollapsed && (
        <div className="p-4 border-t border-border space-y-3">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 text-foreground border border-primary/20">
            <h3 className="font-semibold text-sm mb-2 text-center">
              Want to build apps like this?
            </h3>
            <Button
              className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 h-8 text-xs font-medium shadow-md transition-all duration-200"
              onClick={() =>
                window.open(
                  "https://buildfastwithai.com/genai-course",
                  "_blank"
                )
              }
            >
              Sign up for Gen AI Launchpad
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-xs border-gradient-to-r from-accent/30 to-chart-3/30 hover:bg-gradient-to-r hover:from-accent/10 hover:to-chart-3/10"
            onClick={() =>
              window.open(
                "https://github.com/buildfastwithai/models-arena-benchmark",
                "_blank"
              )
            }
          >
            <Github className="h-3 w-3 mr-1" />
            GitHub
          </Button>
        </div>
      )}
    </div>
  );
}

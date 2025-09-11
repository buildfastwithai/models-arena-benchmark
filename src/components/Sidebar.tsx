"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Zap,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export function Sidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  apiKey,
  setApiKey,
}: SidebarProps) {
  return (
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
          </div>
        )}
      </div>

      {!sidebarCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-8 text-xs"
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
        </div>
      )}
    </div>
  );
}
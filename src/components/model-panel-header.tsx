"use client";

import { Button } from "@/components/ui/button";
import { ModelSelect } from "@/components/model-select";
import { X, Plus } from "lucide-react";

interface ModelPanelHeaderProps {
  model: string;
  setModel: (model: string) => void;
  onRemove?: () => void;
  onAdd?: () => void;
  canRemove: boolean;
  isLast: boolean;
}

export function ModelPanelHeader({
  model,
  setModel,
  onRemove,
  onAdd,
  canRemove,
  isLast,
}: ModelPanelHeaderProps) {
  return (
    <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 flex items-center justify-between gap-2">
      <div className="flex-1">
        <ModelSelect value={model} onValueChange={setModel} />
      </div>

      <div className="flex items-center gap-1">
        {canRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-red-100 hover:to-red-200 hover:text-red-600 transition-all duration-200"
            title="Remove model panel"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {isLast && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAdd}
            className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-200 hover:text-green-600 transition-all duration-200"
            title="Add model panel"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

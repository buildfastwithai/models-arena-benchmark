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
    <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between gap-2">
      <div className="flex-1">
        <ModelSelect value={model} onValueChange={setModel} />
      </div>

      <div className="flex items-center gap-1">
        {canRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
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
            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
            title="Add model panel"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
